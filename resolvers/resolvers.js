const bl = require('../businessLogic');

const MAX_COUNT = 10;


const resolvers = {
    Mutation: {
        createTweet: (_, {body}) => {
            return bl.addTweet(body, 6)
        }
    },
    Query: {
        Tweets: () => bl.getAllTweets(),
        Tweet: (_, {id}) => bl.getTweetById(id),
    },
    Tweet: {
        Author: (tweet) => bl.getAuthorById(tweet.author_id),
        Stats: (tweet) => bl.getTweetStats(tweet.id),
        Subscribers: (tweet, {countFirst}) => bl.getTweetSubscribers(tweet.subscribers, Math.min(countFirst || MAX_COUNT))
    },
    User: {
        full_name: (author) => `${author.first_name} ${author.last_name}`
    },
};


module.exports = resolvers;
