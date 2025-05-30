const express=require('express');
const { auth } = require('../middleware/auth');
const router=express.Router();
const {getHomePage, addIssue, addOutpass}=require('../controllers/studentController.js');
const authorize = require('../middleware/authorize.js');
const parser = require('../config/cloudinaryMulter.js');
const pareserMiddleware = require('../middleware/parserMiddleware.js');


router.get('/home',auth,authorize("student"),getHomePage);
router.post('/issue',auth,authorize("student"),pareserMiddleware,addIssue);
router.post('/outpass',auth,authorize('student'),addOutpass);
module.exports=router;