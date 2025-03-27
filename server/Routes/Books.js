const express = require("express")
const router = express.Router()
const {searchBookByGenre,searchBookByName,searchBookByAuthor,
    fetchAllBooks,fetchIssuedBooksToUser,returnBook,addBook,removeBook
,requestIssueBook,approveIssueRequest,getAllRequests,getUserTransactions} = require('../Controllers/Books')
const {auth} = require('../Middlewares/auth')

router.post('/getbooks', auth,fetchAllBooks);
router.post('/getissuedbooks', auth,fetchIssuedBooksToUser);
router.post('/returnbook', auth,returnBook);
//router.post('/issuebook', auth,issueBook);
router.post('/addbook', auth,addBook);
router.post('/removebook', auth,removeBook);
router.post('/search/name', auth,searchBookByName);
router.post('/search/genre', auth,searchBookByGenre);
router.post('/search/author', auth,searchBookByAuthor);

router.post('/request-book', auth, requestIssueBook);
router.post('/approve-book-request', auth, approveIssueRequest);
router.post('/get-all-book-requests', auth, getAllRequests);
router.post('/get-user-transactions', auth, getUserTransactions);



module.exports = router;