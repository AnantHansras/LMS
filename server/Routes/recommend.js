const express = require('express');
const router = express.Router();
const { recommendBooks } = require('../Controllers/recommend');


router.post('/recommend', recommendBooks);

module.exports = router;
