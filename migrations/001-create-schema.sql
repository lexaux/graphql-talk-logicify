-- Up
create table Tweet(
    id INTEGER PRIMARY KEY,
    body TEXT,
    date DATETIME,
    author_id INTEGER
);

create table TweeterUser(
    id INTEGER PRIMARY KEY,
    username TEXT,
    city TEXT,
    first_name TEXT,
    last_name TEXT
);

create table UserReadTweet(
    id INTEGER PRIMARY KEY,
    tweetId INTEGER,
    userId INTEGER
);

insert into TweeterUser (id, username, city, first_name, last_name) values
    (1, 'bbbIvan', 'New York', 'Ivan', 'Petrov'),
    (2, 'borisJohnson', 'London', 'Boris', 'Johnson'),
    (3, 'avoForever', 'Kherson', 'Avetik', 'Harutyunyan');

insert into Tweet (id, body, date, author_id) values
    (1, 'Hey Im good here look at me',  strftime ("%s", "now") *1000, 1),
    (2, 'Nothing to be afraid. Just cats on the ceiling.',  strftime ("%s", "now") *1000, 2),
    (3, 'Bad way to start your Monday.',  strftime ("%s", "now") *1000, 2);

insert into UserReadTweet(id, tweetId, userId) values
    (1, 1, 1),
    (2, 1, 2),
    (3, 1, 3),
    (4, 2, 1);

-- Down

;