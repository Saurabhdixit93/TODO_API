const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail  = require('../middleWare/nodemailer');

// user account creation 
module.exports.register = async (req, res) =>{
  try{
    const {name , email , password } = req.body;
    // check if user already
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message: 'User Account Already Exists'
        });
    }
    // create new User Account
    user = await new User({
        name,
        email,
        password
    });

    // hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password , salt);

    // save the user to database
    await user.save();

    // send mail notification
    const subject = `Your Account Created SuccessFully "${user.email}"`;
    const html = `<p>Your Account "${user.email}" has been Created.</p>`;
    sendMail(user.email, subject, html);

    // create and send jwt token
    const payLoad = {
        user: {
            id: user.id,
        },
    };
    const token = await jwt.sign( payLoad,process.env.JWT_SECRET,{expiresIn : 3600});
    return res.status(200).json({
        message: 'Your token is here',
        token
    });

    }catch(error){
        return res.status(500).json({
            message: 'Internal Sever Error !'
        })
    }
};

// user login creation

module.exports.login = async (req , res) =>{
   try
   {
    // check if user exists
    const { email , password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            message: 'Error , Invalid User Email Or password'
        });
    }
    // check user password
    const match = await bcryptjs.compareSync(password ,user.password );
    if(!match){
        return res.status(400).json({
            message: 'Error , Invalid User Email Or password'
        });
    }
    // create and send JWT token 
    const payLoad = {
        user:{
            id:user.id,
        },
    };
    const token = await jwt.sign( payLoad,process.env.JWT_SECRET,{expiresIn : 3600});
    return res.status(200).json({
        message: 'Your token is here',
        token
    });
    }
    catch(error){
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};