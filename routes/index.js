const express=require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router=express.Router();

router.get('/',(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error, loggedin:false });
});

router.get("/shop",isLoggedin,async (req,res)=>{
    let products=await productModel.find();
    let success=req.flash("success");
    res.render('shop',{products, success});
})

router.get("/cart",isLoggedin,async (req,res)=>{
    let user=await userModel
        .findOne({email:req.user.email})
        .populate("cart");

    let final=(Number(user.cart[0].price)+20)-Number(user.cart[0].discount);

    res.render('cart',{user,final});
})

router.get("/addtocart/:id",isLoggedin,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop");
})

router.get("/logout",isLoggedin,(req,res)=>{
    res.clearCookie("token");
    res.redirect('/');
})

module.exports=router;