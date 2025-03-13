const express=require('express');

import {signup,login} from '../controllers/authController';
const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
module.exports=router;