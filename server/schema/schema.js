
//We will define our schema (db structure) @33:30
const graphql = require('graphql');

//importing the models of books of authors for Mongoose
const Book = require('../models/book');
//const Author = require('../models/author');

const Author = require('../models/author');

//using lodash to get data from db inside resolve
const _ = require('lodash');



//Parameters of graphql
const {
  GraphQLObjectType,
   GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
  } = graphql;

//Dummy Data
// var books=[
//   {name:'Name of the Wind', genre:'Fantasy', id: '1', authorId:'1'},
//   {name:'The Final Empire', genre:'Fantasy', id: '2', authorId:'2'},
//   {name:'The Long Earth', genre:'Sci-Fi', id: '3', authorId:'3'},
//   {name:'The Hero of Ages', genre:'Fantasy', id: '4', authorId:'2'},
//   {name:'The Colour of Magic', genre:'Fantasy', id: '5', authorId:'3'},
//   {name:'The Light Fantastic', genre:'Fantasy', id: '6', authorId:'3'}
// ];
//
// var authors=[
//   {name:'Patrick Rothfuse', age: 44, id:'1'},
//   {name:'Brandon Sanderson', age: 47, id:'2'},
//   {name:'Terry Pratchett', age: 66, id:'3'}
// ];

//Data Types and arguments
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:() => ({
    id: {type: GraphQLID },
    name: {type: GraphQLString},
    genre:{ type: GraphQLString},
    author:{ //Nested Data
      type:AuthorType, //getting the author from the array using the ID
      resolve(parent, args){
        return Author.findById(parent.authorId) //MondoDB
        //console.log(parent);
        //return _.find(authors, {id: parent.authorId}) //Referencing the ID from the array as the input not the user input
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return Book.find({
          authorId: parent.id
        })
        //return _.filter(books, {authorId: parent.id}) //filtering the books to get all the books with the required author id.
      }
    }
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
        return Book.findById(args.id)
        //code to get data from db/other source. using lodash
      //  return _.find(books, {id: args.id })
      }
    },
    author:{ //getting access for authors
      type: AuthorType,
      args:{id: {type: GraphQLID}},
      resolve(parent, args){
        return Author.findById(args.id)
      //  return _.find(authors, {id: args.id })
      }
    },
    books:{ //Requesting a list of all the books
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({}) // this methos ({}) returns everything
        //return books
      }
    },
    authors:{ //retquesting a list of all authoers
      type: new GraphQLList(AuthorType),
      resolve(parent,args){
        return Author.find({})
    //  return authors
    }
  }
}
});


//setting up mutations to create/edit/delete data in the MongoDB
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args:{
        name: {type: GraphQLString},
        age:  {type: GraphQLInt}
      },
      resolve(parent, args){
        //i create a new data entry using the model i imported above.
        let author = new Author({
           //user should pass these details.
          name: args.name,
          age: args.age
        });
        return author.save(); //saving data after writing it. return is to show the data that was saved.
      }
    },
    addBook: { //adding a book
      type: BookType,
      args:{
        name: {type: GraphQLString},
        genre:{ type: GraphQLString},
        authorId:{ type:GraphQLID}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
}
});

//exporting the schema to let the graphql to use it.
module.exports = new GraphQLSchema({
  //initial root quiery
  query: RootQuery,
  mutation: Mutation //using the mutation we created in the queries --> mutation {...}
});
