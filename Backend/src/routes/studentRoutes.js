const express=require('express');
const { auth } = require('../middleware/auth');
const router=express.Router();
const {getHomePage}=require('../controllers/studentController.js');

router.get('/home',auth,getHomePage);

module.exports=router;