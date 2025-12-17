const express=require('express');
const router=express.Router();
const {registerUser}=require("../controller/authController");
const {loginUser,logout}=require("../controller/authController");

router.get('/',(req,res)=>{
    res.send("User Route!");
})

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
module.exports=router;