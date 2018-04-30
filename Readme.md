# GraphQL support codebase for local talk at Logicify

Hi. This is a small repo with some code @lexaux has created for the small talk
about GraphQL given locally at Logicify office.

It may contain errors, bad style (especially naming conventions), bad architectural
practices - whatever. I have not touched code for two years as of now!

It has no client code, only serverside - the thing ends at graphiql, a small tool for running GQL queries.

## How to run

`npm install` should get you setup with all the dependencies.

`node index.js` after that should run a server at local host on a port 4000. Navigate to http://localhost:4000/graphql for a play.

On a first run the illustrative SQLite database will be created, so there is some basic persistence between the runs.

## Structure and Tags

Structure should be self explanatory - index.js is an entry point. GQL schema is in, well, schema.graphql file, resolvers are in resolvers.

Business logic is a small accessor layer to the database. Repository.js contains some stuff used in older tags (probably worth deleting).

You can use tags to navigate down the histor, the sequence is as follows:

 + Start of the project
 + NoDatabase - access to in-memory storage
 + Database - linked in the sqlite db
 + RestIntegration - connected the thing to Yahoo! weather to demonstrate API integration
 + DataLoader - added a DataLoader optimization sample.

## References

The [GraphQL Official Documentation](http://graphql.org/learn/) and excellent [tutorial by Marmelab](https://marmelab.com/blog/2017/09/06/dive-into-graphql-part-iii-building-a-graphql-server-with-nodejs.html#composing-schemas) are two sources I have mostly used for the talk.

Thanks, and feel free to drop me a line if you have any questions/ideas. Also visit our website https://www.logicify.com to learn more about the company.

Alex.