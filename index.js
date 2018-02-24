// in src/index.js

const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools');

const bl = require('./businessLogic');

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

const resolvers = require('./resolvers/resolvers');

const schema = makeExecutableSchema({typeDefs, resolvers});

let sqlitedb = null;

const app = express();

app.use('/graphql', graphqlHTTP(req => {
    const startTime = Date.now();
    sqlitedb.myRequestCount = 0;
    return {
        schema: schema,
        graphiql: true,
        context: {
            sqlitedb: sqlitedb
        },
        extensions: ({document, variables, operationName, result}) => {
            const timing = Date.now() - startTime;
            console.log(`GraphQL Request Timing is ${timing}`);
            return {
                timing: timing,
                SQLRequestCount: sqlitedb.myRequestCount
            }
        }
    }
}));


bl.initDB().then((db) => {
    db.on('trace', (query) => {
        db.myRequestCount++;
        console.log(`SQL ${db.myRequestCount}>>>>> ` + query)
    });
    sqlitedb = db;
    app.listen(4000)
});

console.log('Running a GraphQL API server at localhost:4000/graphql');
