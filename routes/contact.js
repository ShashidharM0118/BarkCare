// routes/index.js
const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userController");
const session = require("express-session");
const contact = require("../models/contactModel");

router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.redirect("/login"); // Redirect to login page if not logged in
    }
    console.log(userId);
    const user = await getUserData(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.locals = {
      currentPage: "contact",
      user: user,
    };

    res.render("contact.ejs", { check: null });
  } catch (error) {
    console.error("Error in the home route:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.redirect("/login"); // Redirect to login page if not logged in
    }
    console.log(userId);
    const user = await getUserData(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.locals = {
      currentPage: "contact",
      user: user,
    };


    
    const newcontact = new contact(req.body.contact);
    await newcontact.save();
  } catch (err) {
    console.log(err.message);
  }
  console.log("response saved");
  res.render("contact.ejs",{ check: 1 });
});

module.exports = router;
