const User = require("../Models/User");
const Book = require("../Models/Books");
const Transaction = require("../Models/Transaction");
const mailSender = require("../utils/mailSender");
const dueSoonTemplate = require('../Templates/dueTemplate')
const fineTemplate = require('../Templates/fineTemplate')
const calculateFine = (dueDate) => {
  const today = new Date();
  if (today > dueDate) {
    const diffInDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    return diffInDays * 100;
  }
  return 0;
};

const checkAndNotifyOverdueUsers = async () => {
  const today = new Date();
  const overdueTransactions = await Transaction.find({
    returnDate: { $lt: today },
    status: "issued",
  })
    .populate("userId", "email")
    .populate("bookId", "title");
  for (let transaction of overdueTransactions) {
    const fine = calculateFine(transaction.returnDate);
    const bookTitle = transaction.bookId?.title;
    const userEmail = transaction.userId?.email;
    await Transaction.findByIdAndUpdate(transaction._id, {
      fineAmount: fine,
    });

    const message = `Dear User, your borrowed book : ${bookTitle} is overdue. Your fine is ₹${fine}. Please return it as soon as possible.`;
    console.log(message)
    await mailSender(userEmail, "Due Date Reached", fineTemplate(bookTitle,fine));
  }
};

const sendDueDateReminders = async () => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
  const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));


  const transactions = await Transaction.find({
    returnDate: { $gte: startOfDay, $lt: endOfDay },
    status: "issued",
  })
    .populate("userId", "email")
    .populate("bookId", "title");

  for (let transaction of transactions) {
    const bookTitle = transaction.bookId?.title;
    const userEmail = transaction.userId?.email;
    const message = `Dear User, your borrowed book:${bookTitle} is due in 1 day. Please return it by ${transaction.returnDate.toDateString()} to avoid fines.`;
    console.log(message)
    await mailSender(userEmail, "Due Date Reminder", dueSoonTemplate(bookTitle,transaction.returnDate));
  }
};

module.exports = { checkAndNotifyOverdueUsers, sendDueDateReminders };
