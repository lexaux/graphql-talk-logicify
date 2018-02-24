module.exports = {
    tweets: [
        {id: 1, body: 'Lorem Ipsum', date: new Date(), author_id: 10, subscribers: [12,13,11]},
        {id: 2, body: 'Sic dolor amet', date: new Date(), author_id: 11}
    ],
    authors: [
        {id: 10, username: 'johndoe', first_name: 'John', last_name: 'Doe', avatar_url: 'acme.com/avatars/10'},
        {id: 11, username: 'janedoe', first_name: 'Jane', last_name: 'Doe', avatar_url: 'acme.com/avatars/11'},
        {id: 12, username: 'ivanhoe', first_name: 'Ivan', last_name: 'Delanyi', avatar_url: 'acme.com/avatars/12'},
        {id: 13, username: 'romain', first_name: 'Romain', last_name: 'Explique', avatar_url: 'acme.com/avatars/13'},
    ], stats: [
        {tweet_id: 1, views: 123, likes: 4, retweets: 1, responses: 0},
        {tweet_id: 2, views: 567, likes: 45, retweets: 63, responses: 6}
    ]
}