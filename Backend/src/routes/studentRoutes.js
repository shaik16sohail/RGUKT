const express=require('express');
const { auth } = require('../middleware/auth');
const router=express.Router();
const {getHomePage}=require('../controllers/studentController.js');
const authorize = require('../middleware/authorize.js');


router.get('/home',auth,authorize("student"),getHomePage);

module.exports=router;