const User = require('../Models/User')
const Book = require('../Models/Books')
const Transaction = require('../Models/Transaction')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
//done
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

//almost
const fetchIssuedBooksToUser = async (req, res) => {
    try {
        const userId = req.user.id; // Get authenticated user's ID

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const issuedTransactions = await Transaction.find({ userId, status: 'issued' }).populate('bookId', 'title author genre publishedYear') // Fetch title and author from Book model
        .populate('userId', 'name');

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

//almost
const returnBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.body; // Extract bookId and userId from request

        // Find the most recent issued transaction for the given bookId and userId
        const transaction = await Transaction.findOne({ bookId, userId, status: 'issued' })
            .sort({ createdAt: -1 }); // Get the latest issued transaction
        if(transaction.fineAmount > 0){
            return res.status(404).json({
                success: false,
                message: 'Please Pay Fine Before returning the book',
            });
        }
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'No issued transaction found for this book and user',
            });
        }

        // Update the transaction status to 'returned'
        transaction.status = 'returned';
        transaction.returnedDate = new Date();
        await transaction.save();
    

        return res.status(200).json({
            success: true,
            message: 'Book returned successfully',
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const issueBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.body; // Extract bookId from request

        // Validate bookId
        if (!bookId) {
            return res.status(400).json({
                success: false,
                message: 'Book ID is required',
            });
        }

        // Check if the book exists and is available
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        if (book.isAvailable === 'no') {
            return res.status(400).json({
                success: false,
                message: 'Book is currently not available',
            });
        }

        // Check if the book is already issued to the user
        const existingTransaction = await Transaction.findOne({ bookId, userId, status: 'issued' });

        if (existingTransaction) {
            return res.status(400).json({
                success: false,
                message: 'Book is already issued to the user',
            });
        }

        // Set issueDate as today and returnDate as 21 days later
        const issueDate = new Date();
        const returnDate = new Date();
        returnDate.setDate(issueDate.getDate() + 21); // 21 days from issue date

        // Create a new transaction for issuing the book
        const newTransaction = new Transaction({
            bookId,
            userId,
            status: 'issued',
            issueDate,
            returnDate,
        });

        await newTransaction.save();

        // Update book availability to 'no'
        book.isAvailable = 'no';
        await book.save();

        return res.status(201).json({
            success: true,
            message: 'Book issued successfully',
            transaction: newTransaction,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

//done
const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear,keywords } = req.body;
        const attachment = req.file;
        
        if (!title || !author || !genre || !publishedYear ||!keywords) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Ensure keywords is an array
        const parsedKeywords = Array.isArray(keywords) ? keywords : JSON.parse(keywords);

        // Check if the book already exists based on title, author, and published year
        const existingBook = await Book.findOne({ title, author, publishedYear });

        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: "Book already exists",
            });
        }

        let imageUrl = null;
        if (attachment) {
            const uploadedImage = await uploadImageToCloudinary(
                attachment.path,
                process.env.FOLDER_NAME,
                1000,
                1000
            );
            imageUrl = uploadedImage.secure_url;
        }

        // Create a new book entry
        const newBook = new Book({
            title,
            author,
            genre,
            publishedYear,
            keywords: parsedKeywords,
            isAvailable: "yes",
            imageUrl,
        });

        await newBook.save();

        return res.status(201).json({
            success: true,
            message: "Book added successfully",
            book: newBook,
        });
    } catch (error) {
        console.error("Error in addBook:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

//done
const removeBook = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.id;
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

        // Remove all transactions related to this book
        await Transaction.deleteMany({ bookId: bookId, userId: userId });

        // Remove the book
        await Book.findByIdAndDelete(bookId);

        return res.status(200).json({
            success: true,
            message: 'Book and related transactions removed successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const toggleBookAvailability = async (req, res) => {
    try {
        const { bookId } = req.body;

        // Validate input
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

        // Toggle availability status
        book.isAvailable = book.isAvailable === 'yes' ? 'no' : 'yes';
        await book.save();

        return res.status(200).json({
            success: true,
            message: 'Book availability status updated successfully',
            book,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const searchBookByName = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Book title is required',
            });
        }

        // Search for books with matching title (case-insensitive)
        const books = await Book.find({ title: { $regex: new RegExp(title, 'i') } });

        // if (books.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No books found',
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const searchBookByGenre = async (req, res) => {
    try {
        const { genre } = req.query;

        if (!genre) {
            return res.status(400).json({
                success: false,
                message: 'Book genre is required',
            });
        }

        // Search for books with matching genre (case-insensitive)
        const books = await Book.find({ genre: { $regex: new RegExp(genre, 'i') } });

        // if (books.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No books found',
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const searchBookByAuthor = async (req, res) => {
    try {
        const { author } = req.query;

        // Validate input field
        if (!author) {
            return res.status(400).json({
                success: false,
                message: 'Book author is required',
            });
        }

        // Search for books with matching author (case-insensitive)
        const books = await Book.find({ author: { $regex: new RegExp(author, 'i') } });

        // if (books.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No books found',
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            books,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const requestIssueBook = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({
                success: false,
                message: 'Book ID is required',
            });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        if (book.isAvailable === 'no') {
            return res.status(400).json({
                success: false,
                message: 'Book is currently not available',
            });
        }

        const existingRequest = await Transaction.findOne({ bookId, userId, status: 'pending' });
        
        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: 'Request already exists for this book',
            });
        }
        const existingRequest2 = await Transaction.findOne({ bookId, userId, status: 'issued' });
        if (existingRequest2) {
            return res.status(400).json({
                success: false,
                message: 'Book already issued',
            });
        }
        
        const newRequest = new Transaction({
            bookId,
            userId,
            status: 'pending',
            requestDate: new Date(),
        });

        await newRequest.save();

        return res.status(201).json({
            success: true,
            message: 'Book request submitted successfully',
            request: newRequest,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const approveIssueRequest = async (req, res) => {
    try {
        const { transactionID } = req.body;

        if (!transactionID) {
            return res.status(400).json({
                success: false,
                message: 'Request ID is required',
            });
        }

        const transaction = await Transaction.findById(transactionID);

        if (!transaction || transaction.status !== 'pending') {
            return res.status(404).json({
                success: false,
                message: 'Pending request not found',
            });
        }

        const book = await Book.findById(transaction.bookId);

        if (!book || book.isAvailable === 'no') {
            return res.status(400).json({
                success: false,
                message: 'Book is not available',
            });
        }

        transaction.status = 'issued';
        transaction.issueDate = new Date();
        transaction.returnDate = new Date();
        transaction.returnDate.setDate(transaction.issueDate.getDate() + 21);

        await transaction.save();

        return res.status(200).json({
            success: true,
            message: 'Book issued successfully',
            transaction,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const getAllRequests = async (req, res) => {
    try {
        const requests = await Transaction.find({ status: 'pending' })
            .populate('bookId', 'title author')  // Fetch book details
            .populate('userId', 'name email');  // Fetch user details

        return res.status(200).json({
            success: true,
            requests,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
const getUserPendingRequests = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you're using authentication middleware

        const requests = await Transaction.find({ userId, status: 'pending' })
            .populate('bookId', 'title author')  // Populate book details
            .sort({ requestDate: -1 });          // Newest pending requests first

        return res.status(200).json({
            success: true,
            requests,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

const getUserTransactions = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated request

        const transactions = await Transaction.find({ userId })
            .populate('bookId', 'title author') // Fetch book details
            .sort({ requestDate: -1 }); // Sort by latest issued first

        return res.status(200).json({
            success: true,
            transactions,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
const getAllUserTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({})
            .populate('bookId', 'title author')
            .populate('userId', 'name email')     
            .sort({ requestDate: -1 });   
        return res.status(200).json({
            success: true,
            transactions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
const getOverdueBooksWithFineByUser = async (req, res) => {
    try {
    const userId = req.user.id;
      const today = new Date();
  
      const transactions = await Transaction.find({
        userId: userId,
        returnDate: { $lt: today },
        status: { $in: ['issued', 'pending'] },
        fineAmount: { $gt: 0 }
      }).populate('bookId');
  
      const result = transactions.map(tx => ({
        title: tx.bookId.title,
        author: tx.bookId.author,
        fineAmount: tx.fineAmount
      }));
  
      res.status(200).json({
        success: true,
        count: result.length,
        data: result
      });
  
    } catch (error) {
      console.error('Error fetching overdue books:', error);
      res.status(500).json({
        success: false,
        message: 'Server Error: Unable to fetch overdue books for user.',
        error: error.message
      });
    }
};

module.exports = {getOverdueBooksWithFineByUser,requestIssueBook,approveIssueRequest,getAllRequests,getUserTransactions, fetchAllBooks,fetchIssuedBooksToUser,returnBook,issueBook,addBook,removeBook,toggleBookAvailability,searchBookByAuthor,searchBookByGenre,searchBookByName,getAllUserTransactions,getUserPendingRequests}

