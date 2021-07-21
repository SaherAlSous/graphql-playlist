
//Creating a MongoDB schema for books

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema objects
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

//exporting the module
module.exports= mongoose.model('Book', bookSchema);
