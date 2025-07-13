const express=require('express');
const { auth } = require('../middleware/auth');
const { getHomeData, getAllIssues, getAllOutpasses, getOneOutpass,updateOutpass, updateIssue, getAllCompletedOutpasses, getOneCompletedOutpass } = require('../controllers/caretakerController');
const authorize = require('../middleware/authorize');
const router=express.Router();


router.get('/home',auth,authorize("caretaker"),getHomeData);
router.get('/outpasses',auth,authorize("caretaker"),getAllOutpasses);
router.get('/outpasses/completed',auth,authorize("caretaker"),getAllCompletedOutpasses);
router.get('/outpasses/completed/:id',auth,authorize("caretaker"),getOneCompletedOutpass);
router.get('/issues',auth,authorize("caretaker"),getAllIssues);
router.get("/outpasses/:id",auth,authorize("caretaker"),getOneOutpass);
router.patch("/outpasses/:id",auth,authorize("caretaker"),updateOutpass);
router.patch("/issues/:id",auth,authorize("caretaker"),updateIssue);

module.exports=router;