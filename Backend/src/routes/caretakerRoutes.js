const express=require('express');
const { auth } = require('../middleware/auth');
const { getHomeData, getAllIssues, getAllOutpasses } = require('../controllers/caretakerController');
const authorize = require('../middleware/authorize');
const router=express.Router();


router.get('/home',auth,authorize("caretaker"),getHomeData);
router.get('/outpasses',auth,authorize("caretaker"),getAllOutpasses);
router.get('/issues',auth,authorize("caretaker"),getAllIssues);


module.exports=router;