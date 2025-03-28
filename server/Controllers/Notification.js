const User = require('../Models/User')
const Book = require('../Models/Books')
const Transaction = require('../Models/Transaction')
const mailSender = require('../utils/mailSender')

const calculateFine = (dueDate) => {
    const today = new Date();
    if (today > dueDate) {
        const diffInDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)); 
        return diffInDays * 100; // Fine ₹100 per day
    }
    return 0;
};


const checkAndNotifyOverdueUsers = async () => {
    const today = new Date();

    const overdueTransactions = await Transaction.find({
        returnDate: { $lt: today },
        status: 'issued',
    }).populate('userId', 'email').populate('bookId', 'title');

    for (let transaction of overdueTransactions) {
        const fine = calculateFine(transaction.returnDate);
        const book = transaction.title;
        await Transaction.findByIdAndUpdate(transaction._id, {
            fineAmount: fine
        });
        
        const message = `Dear User, your borrowed book : ${book} is overdue. Your fine is ₹${fine}. Please return it as soon as possible.`;
        await sendEmailNotification(transaction.email, message);
        await mailSender(transaction.email,"Due Date Reached",message);
    }
};

const sendDueDateReminders = async () => {
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 20);  // Find transactions due in 7 days

    const transactions = await Transaction.find({
        returnDate: { $eq: dueDate },  
        status: 'issued',
    }).populate('userId', 'email').populate('bookId', 'title');
    

    for (let transaction of transactions) {
        const book = transaction.title;
        const message = `Dear User, your borrowed book:${book} is due in 7 days. Please return it by ${transaction.returnDate.toDateString()} to avoid fines.`;
        await sendEmailNotification(transaction.email,"Due Date Reminder", message);
    }
};

module.exports = { checkAndNotifyOverdueUsers,sendDueDateReminders };
