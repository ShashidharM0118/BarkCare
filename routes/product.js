
// routes/index.js
const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userController");
const session = require("express-session");

router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {

      return res.redirect("/login"); // Redirect to login page if not logged in
    }
     console.log(userId)
    const user = await getUserData(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.locals = {
      currentPage: "product",
      user: user,
    };

    res.render("product.ejs");
  } catch (error) {
    console.error("Error in the home route:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
