const bl = require('../businessLogic');
const validUrl = require('valid-url');
const {GraphQLScalarType} = require("graphql");

const MAX_COUNT = 10;

const validateDateValue = value => {
    if (isNaN(Date.parse(value))) {
        throw new GraphQLError(`Query error: not a valid date`, [value]);
    }
};

const validateURLValue = value => {
    if (!validUrl.isWebUri(value)) {
        throw new GraphQLError(`Query error: not a valid URL`, [value]);
    }
};


const resolvers = {
    Mutation: {
        createTweet: (_, {body}, {sqlitedb}) => bl.addMyTweet(body, sqlitedb),
        markTweetRead: (_, {tweetId, userId}, {sqlitedb}) => bl.markTweetRead(tweetId, userId, sqlitedb)
    },

    Query: {
        Tweets: (prev, params, {sqlitedb}) => bl.getAllTweets(sqlitedb),
        Tweet: (_, {id}, {sqlitedb}) => bl.getTweetById(id, sqlitedb),
        User: (prev, params, {sqlitedb}) => bl.getCurrentUser(sqlitedb)
    },

    Tweet: {
        Author: (tweet, params, {sqlitedb}) => bl.getUserById(tweet.author_id, sqlitedb),
        Stats: (tweet) => bl.getTweetStats(tweet.id),
        Subscribers: (tweet, {countFirst}, {sqlitedb}) => bl.getTweetSubscribers(tweet.id, Math.min(countFirst || MAX_COUNT), sqlitedb)
    },

    User: {
        full_name: (user) => `${user.first_name} ${user.last_name}`,
        avatar_url: (user) => `https://www.gravatar.com/avatar/${user.username}.jpg?d=monsterid`,
    },

    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date type',
        parseValue(value) {
            // value comes from the client, in variables
            validateDateValue(value);
            return new Date(value); // sent to resolvers
        },
        parseLiteral(ast) {
            // value comes from the client, inlined in the query
            if (ast.kind !== Kind.STRING) {
                throw new GraphQLError(`Query error: Can only parse dates strings, got a: ${ast.kind}`, [ast]);
            }
            validateDateValue(ast.value);
            return new Date(ast.value); // sent to resolvers
        },
        serialize(value) {
            // value comes from resolvers
            return new Date(value).toISOString(); // sent to the client
        },
    }),

    Url: new GraphQLScalarType({
        name: 'Url',
        description: "A specific URL type",
        parseValue(value) {
            validateURLValue(value);
            return value;
        },
        parseLiteral(ast) {
            if (ast.kind !== Kind.STRING) {
                throw new GraphQLError(`Query error: Can only parse dates strings, got a: ${ast.kind}`, [ast]);
            }
            validateURLValue(ast.value);
            return ast.value;
        },
        serialize(value) {
            validateURLValue(value);
            return value;
        }
    })

};

module.exports = resolvers;
