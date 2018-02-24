const repository = require('./repository');
const sqlite = require('sqlite');
const q = require('q');

const DBNAME = './db.sqlite';


const bl =
    {
        initDB: () => {
            return sqlite.open(DBNAME).then(
                (db) => {
                    db.migrate({force: 'last'}).catch((err) => {
                        console.log(err)
                    });
                    return db;
                })
        },

        getAllTweets: (db) => (db.all("select * from Tweet order by ID limit 10")),

        getTweetById: (id, db) => (db.get("select * from Tweet where id = ?", [id])),

        getCurrentUser: (db) => (db.get("select * from TweeterUser limit 1")),

        getUserById: (id, db) => (db.get("select * from TweeterUser where id = ?", id)),

        getTweetSubscribers: (tweetId, limit, db) => (db.all(
            `select 
                user.* 
            from 
                Tweet tw 
                join UserReadTweet urt on tw.id = urt.tweetId
                join TweeterUser user on urt.userId = user.id 
            where
                tw.id = ? 
            limit ?`, tweetId, limit)),

        addMyTweet: (body, db) => {
            return bl.getCurrentUser(db)
                .then((user) => {
                    return db.run('insert into Tweet(body, date, author_id) values(?, ?, ?)', body, new Date(), user.id)
                })
                .then((obj) => {
                    return bl.getTweetById(obj.lastID, db);
                });
        },

        markTweetRead: (tweetId, userId, db) => (db.run('insert into UserReadTweet(userId, tweetId) values (?, ?)', userId, tweetId)),

    };

module.exports = bl;
