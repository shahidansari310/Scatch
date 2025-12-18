const express = require('express');
const router = express.Router();
const adminmodel = require('../models/admin-model');
const productModel = require("../models/product-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAdmin = require('../middlewares/isAdmin');

// Render Admin Login Page
router.get('/owner', (req, res) => {
    let error = req.flash("error");
    res.render("owner-login", { error, loggedin: false });
});

// Admin Creation (Setup) - Only in development or if no admin exists
router.post('/create', async (req, res) => {
    try {
        let admins = await adminmodel.find();
        if (admins.length > 0) {
            return res.status(403).send('Admin already exists. Cannot create another admin.');
        }

        let { fullname, email, password } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let createdAdmin = await adminmodel.create({
            fullname,
            email,
            password: hashedPassword,
        });
        
        res.status(201).send("Admin created successfully. You can now login at /owner");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Admin Login Logic
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let admin = await adminmodel.findOne({ email });
        
        if (!admin) {
            req.flash("error", "Invalid admin credentials");
            return res.redirect("/owner");
        }

        let isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            req.flash("error", "Invalid admin credentials");
            return res.redirect("/owner");
        }

        let token = jwt.sign({ email: admin.email, id: admin._id }, process.env.SECRET);
        res.cookie("adminToken", token);
        res.redirect("/admin/dashboard");
    } catch (error) {
        req.flash("error", "Something went wrong");
        res.redirect("/owner");
    }
});

// Admin Logout
router.get('/logout', (req, res) => {
    res.clearCookie("adminToken");
    req.flash("success", "Logged out successfully");
    res.redirect("/owner");
});

// Protected Admin Routes - Add isAdmin middleware
router.get('/dashboard', isAdmin, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("admin", { 
        products, 
        success, 
        user: null, 
        loggedin: true 
    }); 
});

// View Create Product Page
router.get('/create-product', isAdmin, (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", { 
        success, 
        user: null, 
        loggedin: true 
    });
});

// Delete Product Logic 
router.get('/delete/:id', isAdmin, async (req, res) => {
    await productModel.findOneAndDelete({ _id: req.params.id });
    req.flash("success", "Product deleted successfully");
    res.redirect("/admin/dashboard");
});

// Delete All Products 
router.get('/delete-all', isAdmin, async (req, res) => {
    await productModel.deleteMany({});
    req.flash("success", "Inventory cleared");
    res.redirect("/admin/dashboard");
});

module.exports = router;