const express = require('express');
const router = express.Router();
const adminmodel = require('../models/admin-model');
const productModel = require("../models/product-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Creation (Setup) - Only in development
if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        let admins = await adminmodel.find();
        if (admins.length > 0) return res.status(503).send('Admin already exists');

        let { fullname, email, password } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let createdAdmin = await adminmodel.create({
            fullname,
            email,
            password: hashedPassword,
        });
        res.status(201).send("Admin created. You can now login at /owner");
    });
}

// Admin Login Logic
router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let admin = await adminmodel.findOne({ email });
    if (!admin) return res.status(401).send("Invalid Credentials");

    let isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).send("Invalid Credentials");

    let token = jwt.sign({ email: admin.email, id: admin._id }, process.env.SECRET);
    res.cookie("token", token);
    res.redirect("/admin/admin");
});

// View Dashboard 
router.get('/admin', async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("admin", { products, success }); 
});

// View Create Product Page
router.get('/create-product', (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", { success });
});

// Delete Product Logic 
router.get('/delete/:id', async (req, res) => {
    await productModel.findOneAndDelete({ _id: req.params.id });
    req.flash("success", "Product deleted successfully");
    res.redirect("/admin/admin");
});

// Delete All Products 
router.get('/delete-all', async (req, res) => {
    await productModel.deleteMany({});
    req.flash("success", "Inventory cleared");
    res.redirect("/admin/admin");
});

module.exports = router;