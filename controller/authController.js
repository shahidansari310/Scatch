const bcrypt=require('bcrypt');
const {generateToken}=require('../utils/generateToken');
const userModel=require('../models/user-model');

module.exports.registerUser=async (req,res)=>{
    try {
        let {email,password,fullname}=req.body;

        let user=await userModel.findOne({email:email});
        if (user) {
            // req.flash("error", "You already have an account, please login.");
            // return res.redirect("/signup");    
            return res.redirect("/signup?error=You already have an account, please login."); 
            }

        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err) return res.send(err.message);
                let user=await userModel.create({
                email,
                password:hash,
                fullname
                });
                
                let token=generateToken(user);
                res.cookie("token",token);

                // req.flash("success","User created successfully");
                // res.redirect("/shop");
                return res.redirect("/shop?success=User created successfully");

                })
            })
    } catch (error) {
        res.status(501).send(error.message);
    }
}

module.exports.loginUser=async (req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await userModel.findOne({email:email});

        if(!user) {
            // req.flash("error", "Invalid email or password");
            // return res.redirect("/");
            return res.redirect("/?error=Invalid email or password");
        }

        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                let token=generateToken(user);
                res.cookie("token",token);
                res.redirect('/shop');
            }
            else{
                req.flash("error", "Invalid email or password");
                res.redirect("/");
            }
        })

    } catch (error) {
        res.status(501).send(error.message);
    }
}

module.exports.logout=(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}