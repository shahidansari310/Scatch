const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin-model");

module.exports = async (req, res, next) => {
    if (!req.cookies.adminToken) {
        req.flash("error", "Admin access required");
        return res.redirect("/owner");
    }

    try {
        let decoded = jwt.verify(req.cookies.adminToken, process.env.SECRET);
        let admin = await adminModel.findOne({ email: decoded.email }).select("-password");
        
        if (!admin) {
            req.flash("error", "Invalid admin credentials");
            return res.redirect("/owner");
        }
        
        req.admin = admin;
        next();
    } catch (error) {
        req.flash("error", "Session expired, please login again");
        res.redirect("/owner");
    }
};