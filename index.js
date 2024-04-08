require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const contact = require("./routes/contact.js");
const product = require("./routes/product.js");
const home = require("./routes/home.js");
const service = require("./routes/service.js");
const about = require("./routes/about.js");
const userRoutes = require("./routes/user.js");

const session = require("express-session");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));

//logger
// app.use((req, res, next) => {
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });

app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", userRoutes);
app.use("/contact",contact);
app.use("/product",product);
app.use("/home",home);
app.use("/service",service);
app.use("/about",about);

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

