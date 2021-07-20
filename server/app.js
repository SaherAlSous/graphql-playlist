const express = require('express');

 //Express graphql module allows Express to understand graphql.
const graphqlHTTP = require('express-graphql').graphqlHTTP;

//importing schema
const schema = require('./schema/schema');

const app = express();

//setting up middle ware for graphql and Express
//graphql needs a schema to represent how the graphql looks (db structure)
 // or we can just put schema since both names as the same.
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true //enabling it so we can access it in browser
}));

app.listen(4000,()=> {
  console.log('listening on port 4000');
});
