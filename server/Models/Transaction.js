const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookId: { type:mongoose.Schema.Types.ObjectId , required: true,ref:"Book" },
  userId: { type:mongoose.Schema.Types.ObjectId , required: true,ref:"User" },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['issued', 'returned'], required: true },
  issueDate: { type: Date, required: true }, // Date when book is issued
  returnDate: { type: Date, required: true }, // Date by which book should be returned
  returnedDate: { type: Date },   // Date when book is returned

},);


module.exports = mongoose.model('Transaction', transactionSchema);