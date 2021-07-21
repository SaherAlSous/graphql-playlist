const express = require('express');

 //Express graphql module allows Express to understand graphql.
const graphqlHTTP = require('express-graphql').graphqlHTTP;

//importing schema
const schema = require('./schema/schema');

//Implementing and configuring Mongoose
//https://stackoverflow.com/questions/51583465/to-use-the-new-parser-pass-option-usenewurlparser-true-to-mongoclient-conn
const mongoose = require('mongoose');

const app = express();



// Connect to mLab database
mongoose.connect(
  'mongodb+srv://saher:8pWCii57ntpDL2q@cluster0.2yenv.mongodb.net/Cluster0?retryWrites=true&w=majority',
   { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open',() =>{ // once connection is open
  console.log('Connected to database'); //logging the successful connection with the db
});



/*setting up middle ware for graphql and Express
* graphql needs a schema to represent how the graphql looks (db structure)
* schema: schema or we can just put schema since both names as the same.
*/
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true //enabling it so we can access it in browser
}));

app.listen(4000,()=> {
  console.log('listening on port 4000');
});


/**
* db on MongoDB: saher
* password: 8pWCii57ntpDL2q
* IP: 85.113.116.151
* connect to db: mongodb+srv://saher:<8pWCii57ntpDL2q>@cluster0.2yenv.mongodb.net/Cluster0?retryWrites=true&w=majority
* install Mongoose in console --> npm install mongoose
*/
