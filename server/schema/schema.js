//We will define our schema (db structure) @33:30
const graphql = require('graphql');

//using lodash to get data from db inside resolve
const _ = require('lodash')

//Parameters of graphql
const {
  GraphQLObjectType,
   GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
  } = graphql;

//Dummy Data
var books=[
  {name:'Name of the Wind', genre:'Fantasy', id: '1'},
  {name:'The Final Empire', genre:'Fantasy', id: '2'},
  {name:'The Long Earth', genre:'Sci-Fi', id: '3'}
];

var authors=[
  {name:'Patrick Rothfuse', age: 44, id:'1'},
  {name:'Brandon Sanderson', age: 47, id:'2'},
  {name:'Terry Pratchett', age: 66, id:'3'}
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:() => ({
    id: {type: GraphQLID },
    name: {type: GraphQLString},
    genre:{ type: GraphQLString}
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

//Root queries is how we initially get into the graph to reach/get data. we have to define them.
const RootQuery= new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    // quiery for a Book
    book:{
      type: BookType,
      args:{ //defining the arguments that the use should pass when requesting a book.
        id: {type: GraphQLID}
      },
      resolve(parent, args){
        console.log(typeof(args.id));
        //code to get data from db/other source. using lodash
        return _.find(books, {id: args.id })
      }
    },
    author:{ //getting access for authors
      type: AuthorType,
      args:{id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(authors, {id: args.id })
      }
    }
  }
});
//exporting the schema to let the graphql to use it.
module.exports = new GraphQLSchema({
  //initial root quiery
  query: RootQuery
});
