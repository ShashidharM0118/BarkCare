const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subSchema = new Schema({
    usermail: {
        type: String,
        required: true,
    },
    subType: {
        type: String,
        required: true,
    },
    
});

const subscription = mongoose.model("subscription", subSchema);
module.exports = subscription;   
