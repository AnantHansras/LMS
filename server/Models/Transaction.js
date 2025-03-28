const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookId: { type:mongoose.Schema.Types.ObjectId , required: true,ref:"Book" },
  userId: { type:mongoose.Schema.Types.ObjectId , required: true,ref:"User" },
  status: { type: String, enum: ['issued', 'returned','pending'], required: true },
  issueDate: { type: Date }, // Date when book is issued
  returnDate: { type: Date}, // Date by which book should be returned
  returnedDate: { type: Date },
  requestDate: { type: Date },   // Date when book is returned
},);


module.exports = mongoose.model('Transaction', transactionSchema);