const express = require("express")
const router = express.Router()
const {resetPasswordToken,resetPassword} = require('../Controllers/ResetPassword')


router.post('/passwordtoken',resetPasswordToken);
router.post('/resetpassword',resetPassword);
module.exports = router;