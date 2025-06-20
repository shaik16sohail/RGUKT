const express=require('express');
const { auth } = require('../middleware/auth');
const router=express.Router();
const {getHomePage, addIssue, addOutpass, deleteOutpass, deleteIssue}=require('../controllers/studentController.js');
const authorize = require('../middleware/authorize.js');
const parser = require('../config/cloudinaryMulter.js');
const pareserMiddleware = require('../middleware/parserMiddleware.js');


router.get('/home',auth,authorize("student"),getHomePage);
router.post('/issue',auth,authorize("student"),pareserMiddleware,addIssue);
router.post('/outpass',auth,authorize('student'),addOutpass);
router.delete('/outpass/:id',auth,authorize('student'),deleteOutpass);
router.delete('/outpass/:id',auth,authorize('student'),deleteIssue);
module.exports=router;