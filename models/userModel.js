// requiring mongoose to create user schema
const mongoose = require('mongoose');

// creating user schema
const userSchema  = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    name:{
        type:String
    }
});

// exporting for global use
module.exports  = mongoose.model('User' , userSchema);
