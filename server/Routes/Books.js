const express = require("express")
const router = express.Router()
const {fetchAllBooks,fetchIssuedBooksToUser,returnBook,issueBook,addBook,removeBook,searchBookByName,searchBookByGenre,searchBookByAuthor} = require('../Controllers/Books')
const {auth} = require('../Middlewares/auth')

router.post('/all', auth,fetchAllBooks);
router.post('/issued', auth,fetchIssuedBooksToUser);
router.post('/return', auth,returnBook);
router.post('/issue', auth,issueBook);
router.post('/add', auth,addBook);
router.post('/remove', auth,removeBook);
router.post('/search/name', auth,searchBookByName);
router.post('/search/genre', auth,searchBookByGenre);
router.post('/search/author', auth,searchBookByAuthor);


module.exports = router;