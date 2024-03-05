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
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router


