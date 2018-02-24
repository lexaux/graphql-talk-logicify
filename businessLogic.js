const repository = require('./repository')

module.exports = {
    getAllTweets: () => (repository.tweets),
    getTweetById: (id) => (
        repository.tweets.find(
            tweet => tweet.id == id
        )
    ),
    addTweet: (body, author) => {
        const nextTweetId = repository.tweets.reduce((id, tweet) => {
            return Math.max(id, tweet.id);
        }, -1) + 1;
        const newTweet = {
            id: nextTweetId,
            date: new Date(),
            author_id: author,
            body,
        };
        repository.tweets.push(newTweet);
        return newTweet;
    },
    getAuthorById: (id) => {
        return repository.authors.find(author => author.id == id)
    },
    getTweetStats: (tweetId) => {
        return repository.stats.find(stat => stat.tweet_id == tweetId)
    },
    getTweetSubscribers: (subscriberList, count) => {
        if (!subscriberList) {
            return []
        }
        // could run join query here, we have all the 'in' IDs
        return subscriberList.map(id => (repository.authors.find(author => author.id == id))).slice(0, count);
    }
}


