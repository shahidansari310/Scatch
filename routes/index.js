const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/", function (req, res) {
    // let error = req.flash("error");
    let error = req.query.error || "";
    res.render("index", { error, loggedin: false }); 
});

router.get("/signup", function (req, res) {
    // let error = req.flash("error");
    let error = req.query.error || "";
    res.render("signup", { error, loggedin: false });
});

router.get("/shop", isLoggedin, async (req, res) => {
    let products = await productModel.find();
    // let success = req.flash("success");
    let success = req.query.success || "";
    res.render('shop', { products, success });
})

router.get("/cart", isLoggedin, async (req, res) => {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");
    let subtotal = 0;
    let totalDiscount = 0;

    user.cart.forEach(item => {
        subtotal += Number(item.price);
        totalDiscount += Number(item.discount || 0);
    });

    const platformFee = 20;
    const shippingFee = 0;
    
    let final = user.cart.length > 0 ? (subtotal + platformFee) - totalDiscount : 0;

    res.render('cart', { 
        user, 
        subtotal, 
        totalDiscount, 
        platformFee, 
        final,
        loggedin: true 
    });
});

router.get("/account", isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        res.render("account", { user, loggedin: true });
    } catch (err) {
        res.status(500).send("Error loading account page");
    }
});

router.get("/addtocart/:id", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    // req.flash("success", "Added to cart");
    res.redirect("/shop?success=Added to cart");
    
})

router.get("/removefromcart/:id", isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        
        user.cart.pull(req.params.id);
        await user.save();
        
        // req.flash("success", "Item removed from cart");
        res.redirect("/cart?success=Item removed from cart");
    } catch (err) {
        res.redirect("/cart");
    }
});

router.get("/logout", isLoggedin, (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
})

module.exports = router;