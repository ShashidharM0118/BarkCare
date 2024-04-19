const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rpass:{
    type:String,
      required: true
  }
})

// static signup method
userSchema.statics.signup = async function(username ,email, password,rpass) {

 try{
   // validation
   if (!validator.isEmail(email)) {
     throw Error("Email not valid! Please enter a valid Email.");
   }

   const exists = await this.findOne({ email });

   if (exists) {
     throw Error(
       "Email already in use, login or sign up with a different email.",
     );
   }
   if (!validator.isStrongPassword(password)) {
     throw Error(
       "Password not strong enough! Make sure your password is at least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number and one",
     );
   }
   rpass = password
   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(password, salt)

   const user = await this.create({ username ,email, password: hash ,rpass})

   return user
 }
  catch(error){
    throw error;
  }
}

// static login method
userSchema.statics.login = async function(email, password) {
  try {
    if (!email || !password) {
      throw Error("All fields must be filled! Please enter all fields.");
    }

    const user = await this.findOne({ email });
    if (!user) {
      throw Error("Incorrect email! Please enter a valid Email");
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }

    return user;
  } catch (error) {
    throw error; 
  }
};


module.exports = mongoose.model('User', userSchema)