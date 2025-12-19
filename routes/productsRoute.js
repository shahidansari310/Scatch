const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post('/create', upload.single("image"), (req, res) => {
    try {
        let {
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        } = req.body;
        let product = productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });
        req.flash("success","Product created successfully");
        res.redirect("/admin/dashboard");
    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = router;