// in src/index.js

const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools');

const resolvers = require('./resolvers/resolvers');


const bl = require('./businessLogic')

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');


const schema = makeExecutableSchema({typeDefs, resolvers});


const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
