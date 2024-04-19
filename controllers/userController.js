const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const session = require("express-session");
 const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
     req.session.userId = user._id;
    // res.status(200).json({email, token})
    res.redirect("/home");
  } catch (error) {
    res.render('login', { error: error.message });
  }
}

// signup a user
const signupUser = async (req, res) => {
   const { email, username, password } = req.body;
  console.log(username)
  console.log(email)
  console.log(password)

  try {
    const user = await User.signup(username ,email, password)

    
    const token = createToken(user._id)
    req.session.userId = user._id;
     res.redirect("/home");
    console.log(password)

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
        to: `${email}`,
        subject: "BarkCare",
        html: `
        <h1>Thank you for choosing Barkcare !</h1>
         <p>hello ${username}, <p>
        <p>you have succesfully signed up for Barkcare</p>
       
        `,
      });

      console.log(info.messageId);




    
    
  } catch (error) {
    res.render('login', { error: error.message });
  }
}



const getUserData = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user data from MongoDB:", error);
    throw error;
  }
};

module.exports = { signupUser, loginUser ,getUserData}