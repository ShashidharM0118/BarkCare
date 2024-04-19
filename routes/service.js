
// routes/index.js
const express = require("express");
const router = express.Router();
const { getUserData } = require("../controllers/userController");
const session = require("express-session");
const Sub = require('../models/subscriptionModel')
 const nodemailer = require("nodemailer");

router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {

      return res.redirect("/login"); 
    }
     console.log(userId)
    const user = await getUserData(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.locals = {
      currentPage: "service",
      user: user,
    };
    const subs = await Sub.find({ usermail: user.email });
    res.render("service.ejs",{check:null,subs:subs});
  } catch (error) {
    console.error("Error in the home route:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) =>{
  try {
    const userId = req.session.userId;

    if (!userId) {

      return res.redirect("/login");
    }
     console.log(userId)
    const user = await getUserData(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.locals = {
      currentPage: "service",
      user: user,
    };
    const { subType } = req.body;
    console.log(user._id);
    const newSub= new Sub({ usermail: user.email ,subType: subType  });
    await newSub.save();
    const subs = await Sub.find({ usermail: user.email });
    const check = 1;
    res.render("service.ejs",{check: check,subs:subs});



    
       let transporter = nodemailer.createTransport({
         host: "smtp.gmail.com", 
         port: 465, 
         secure: true,
         auth: {
           user: "barkcare.mail@gmail.com", 
           pass: "hlhm gpkf hkyo zmrw", 
           
         },
       });

      
       let info = await transporter.sendMail({
         from: 'barkcare.mail@gmail.com',
         to: `${user.email}`,
         subject: "BarkCare",
         html: `
         <h1>Payment Successfull !</h1>
         <p>hello ${user.username}, <p>
         <p>you have successfully purchased ${subType} plan</p>
         <p>You Can meet our profesionals every sunday 6:00 pm through </p>
          <a href="https://meet.google.com/gdx-kzzs-iyo?ijlm=1713299718780&adhoc=1&hs=187">https://meet.google.com/gdx-kzzs-iyo?ijlm=1713299718780&adhoc=1&hs=187</a>
          For more queries of the plan contact : 9483746823
         `,
       });

       console.log(info.messageId);





    
  }
  catch (error) {
      console.error("Error in the home route:", error);
      res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
