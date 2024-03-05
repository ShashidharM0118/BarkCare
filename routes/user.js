const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()


router.get("/login", async (req, res) => {
    res.locals.currentPage = "login";
    res.render("login.ejs");
});

router.get("/signup", async (req, res) => {
    res.locals.currentPage = "login";
    res.render("signup.ejs");
});

// login route
router.post('/', loginUser)

// signup route
router.post('/', signupUser)

module.exports = router


