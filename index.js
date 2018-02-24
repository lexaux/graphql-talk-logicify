// in src/index.js

const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./resolvers/resolvers');

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

const schema = makeExecutableSchema({typeDefs, resolvers});

const app = express();

app.use('/graphql', graphqlHTTP(req => {
    const startTime = Date.now();
    return {
        schema: schema,
        graphiql: true,
        extensions: ({document, variables, operationName, result}) => {
            const timing = Date.now() - startTime;
            console.log(`Hello, timing is ${timing}`);
            return {
                timing: timing
            }
        }
    }
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
