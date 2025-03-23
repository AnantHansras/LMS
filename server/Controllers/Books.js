const User = require('../Models/User')
const Book = require('../Models/Books')
const Transaction = require('../Models/Transaction')

const fetchAllBooks = async (req,res) =>{
    try{
        const books = await Book.find({}); // Fetch all books from DB
        return res.status(200).json({
            success: true,
            data: books
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

const fetchIssuedBooksToUser = async (req, res) => {
    try {
        const userId = req.user.id; // Get authenticated user's ID

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const issuedTransactions = await Transaction.find({ userId, status: 'issued' }).populate({
            path: 'bookId',
            model: 'Book'
        });

        // if (issuedTransactions.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No books issued to this user."
        //     });
        // }

        // Extract full book details from transactions
        const issuedBooks = issuedTransactions.map(transaction => transaction.bookId.toObject());

        return res.status(200).json({
            success: true,
            data: issuedBooks
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
};

const returnBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.body; // Extract bookId and userId from request

        // Find the most recent issued transaction for the given bookId and userId
        const transaction = await Transaction.findOne({ bookId, userId, status: 'issued' })
            .sort({ createdAt: -1 }); // Get the latest issued transaction

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'No issued transaction found for this book and user',
                error: err.message
            });
        }

        // Update the transaction status to 'returned'
        transaction.status = 'returned';
        await transaction.save();

        return res.status(200).json({
            success: true,
            message: 'Book returned successfully',
        });
    } catch (error) {
        return res.status(404).json({
            success: true,
            message: 'Server error',
            error: error.message
        });
    }
};

const issueBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.body; // Extract bookId and userId from request

        // Check if the book is already issued to the user
        const existingTransaction = await Transaction.findOne({ bookId, userId, status: 'issued' });

        if (existingTransaction) {
            return res.status(400).json({
                success: false,
                message: 'Book is already issued to the user',
            });
        }

        // Create a new transaction for issuing the book
        const newTransaction = new Transaction({
            bookId,
            userId,
            status: 'issued',
        });

        await newTransaction.save();

        return res.status(201).json({
            success: true,
            message: 'Book issued successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear, isAvailable } = req.body;

        // Validate input fields
        if (!title || !author || !genre || !publishedYear || !isAvailable) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if the book already exists based on title and author
        const existingBook = await Book.findOne({ title, author ,publishedYear});

        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: 'Book already exists',
            });
        }

        // Create a new book entry
        const newBook = new Book({
            title,
            author,
            genre,
            publishedYear,
            isAvailable
        });

        await newBook.save();

        return res.status(201).json({
            success: true,
            message: 'Book added successfully',
            book: newBook,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const removeBook = async (req, res) => {
    try {
        const { bookId } = req.body;

        // Validate bookId
        if (!bookId) {
            return res.status(400).json({
                success: false,
                message: 'Book ID is required',
            });
        }

        // Find the book by ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        // Remove the book
        await Book.findByIdAndDelete(bookId);

        return res.status(200).json({
            success: true,
            message: 'Book removed successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};


module.exports = { fetchAllBooks,fetchIssuedBooksToUser,returnBook,issueBook,addBook,removeBook};