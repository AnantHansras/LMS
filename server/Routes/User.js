const express = require("express")
const router = express.Router()
const {loginController,signupController,sendotpController,} = require('../Controllers/User')

router.post('/login',loginController);
router.post('/signup',signupController);
router.post("/sendotp", sendotpController);

module.exports = router;