const mongoose = require('mongoose');


const booksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true},
  genre: { type: String, required: true},
  publishedYear: {type:Number,required: true},
  // keyword:[{type: String,required:true}],
  isAvailable: {
    type: String,
    enum: ['yes', 'no'], 
    required: true
  }
},{timestamps:true});


module.exports = mongoose.model('Book', booksSchema);

