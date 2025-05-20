const express=require('express');
const { auth } = require('../middleware/auth');
const router=express.Router();
const {getHomePage, addIssue}=require('../controllers/studentController.js');
const authorize = require('../middleware/authorize.js');
const parser = require('../config/cloudinaryMulter.js');


router.get('/home',auth,authorize("student"),getHomePage);
router.post('/issue',auth,authorize("student"),parser.single('image'),addIssue);

module.exports=router;