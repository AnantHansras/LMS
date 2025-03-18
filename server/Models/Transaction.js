const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookId: { type:mongoose.Schema.Types.ObjectId , required: true,ref:"Book" },
  userId: { type:mongoose.Schema.Types.ObjectId , required: true,ref:"User" },
  email: { type: String, required: true, unique: true },
},{timestamps:true});


module.exports = mongoose.model('Transaction', transactionSchema);