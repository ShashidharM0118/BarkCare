const {contactSchema} = require("../schema.js");
const express = require("express");
const router = express.Router();
const contact = require("../models/contactModel.js");

router.get("/", async (req, res) => {
    res.locals.currentPage = "contact";
    res.render("contact.ejs");
});

router.post("/", async (req, res) => {
      const {error} = contactSchema.validate(req.body);
      console.log(error);
      const newcontact = new contact(req.body.contact);
      await newcontact.save();
   
   
    console.log("response saved");
    res.redirect("/contact");

});

module.exports = router;