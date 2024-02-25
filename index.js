require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const contact = require("./models/contactModel.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));

//logger
app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
});

app.get("/home", async (req, res) => {
    res.locals.currentPage = "home";
    res.render("index.ejs");
});

app.get("/about", async (req, res) => {
     res.locals.currentPage = "about";
    res.render("about.ejs");
});

app.get("/service", async (req, res) => {
    res.locals.currentPage = "service";
    res.render("service.ejs");
});

app.get("/product", async (req, res) => {
    res.locals.currentPage = "product";
    res.render("product.ejs");
});

app.get("/login", async (req, res) => {
    res.locals.currentPage = "login";
    res.render("login.ejs");
});

app.get("/contact", async (req, res) => {
    res.locals.currentPage = "contact";
    res.render("contact.ejs");
});

app.post("/contact", async (req, res) => {
    try{
      const newcontact = new contact(req.body.contact);
      await newcontact.save();
    }
    catch(err){
       next(err);
    }
    console.log("response saved");
    res.redirect("/contact");

});



mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                "connected to db & listening on port",
                process.env.PORT
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
