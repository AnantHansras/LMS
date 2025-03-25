const express = require("express")
const router = express.Router()
const {fetchAllBooks,fetchIssuedBooksToUser,returnBook,issueBook,addBook,removeBook} = require('../Controllers/Books')
const {auth} = require('../Middlewares/auth')

router.post('/getbooks', auth,fetchAllBooks);
router.post('/getissuedbooks', auth,fetchIssuedBooksToUser);
router.post('/returnbook', auth,returnBook);
router.post('/issuebook', auth,issueBook);
router.post('/addbook', auth,addBook);
router.post('/removebook', auth,removeBook);
// router.post('/search/name', auth,searchBookByName);
// router.post('/search/genre', auth,searchBookByGenre);
// router.post('/search/author', auth,searchBookByAuthor);


module.exports = router;