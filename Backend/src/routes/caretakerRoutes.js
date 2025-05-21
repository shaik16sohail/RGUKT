const express=require('express');
const { auth } = require('../middleware/auth');
const { getHomeData, getAllIssues, getAllOutpasses, getOneOutpass } = require('../controllers/caretakerController');
const authorize = require('../middleware/authorize');
const router=express.Router();


router.get('/home',auth,authorize("caretaker"),getHomeData);
router.get('/outpasses',auth,authorize("caretaker"),getAllOutpasses);
router.get('/issues',auth,authorize("caretaker"),getAllIssues);
router.get("/outpasses/:id",auth,authorize("caretaker"),getOneOutpass);

module.exports=router;