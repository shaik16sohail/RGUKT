const express=require('express');

const {sendOtp,verifyOtp,register, loginUser, logoutUser}= require('../controllers/authController');
const { auth } = require('../middleware/auth');
const router=express.Router();
router.post("/send-otp",sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", register);
router.post("/login",loginUser);
router.post("/logout",auth,logoutUser);
module.exports=router;