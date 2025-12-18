const express=require('express');
const router=express.Router();
const adminmodel=require('../models/admin-model');
const productModel = require("../models/product-model");

if(process.env.NODE_ENV==='development'){
    router.post('/create',async (req,res)=>{
        let admin=await adminmodel.find();
        if(admin.length>0) return res.status(503).send('You Dont have permission to create admin');

        let {fullname,email,password}=req.body;
        let createdAdmin=await adminmodel.create({
            fullname,
            email,
            password,
        })

        res.status(200).send(createdAdmin);
    })
}

router.get('/admin', async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("admin", { products, success }); 
});

module.exports=router;