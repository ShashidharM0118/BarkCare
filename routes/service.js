const {contactSchema} = require("../schema.js");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    res.locals.currentPage = "service";
    res.render("service.ejs");
});

module.exports = router;