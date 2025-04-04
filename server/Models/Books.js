const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true},
  genre: { type: String, required: true},
  publishedYear: {type:Number,required: true},
  keywords: [{ type: String, required: true }],
  isAvailable: {
    type: String,
    enum: ['yes', 'no'], 
    required: true
  },
  imageUrl: {
        type: String, // Field to store the image URL
        required: false // Optional field
  }
},{timestamps:true});


module.exports = mongoose.model('Book', booksSchema);

