// Importing express and all importaint libraries
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const auth = require('./middleWare/authentication');
const nodemailer = require('nodemailer');
const PORT = 5000;
const app = express();


// middleware
app.use(cors());
app.use(express.json());

// DataBase Connection for storage
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected  successfull : ${conn.connection.host}`);
    }catch(err){
        console.log(`Error In Connecting MongoDB: ${err}`);
        process.exit(1);
    }
};

// url endcoding
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the homepage
app.get('/', (req, res) => {
    return res.send (`
        <h1>Welcome to Todo API</h1>
        <p>This API allows you to manage your tasks using CRUD operations.</p>
        <p>For More info and how to use this api check documentation below.</p>
        <button onclick="window.location.href='https://github.com/Saurabhdixit93/TODO_API'">Check out on GitHub</button>`
    );
});
// handle Api Requests to use auth routes
app.use('/api/auth',require('./routers/auth'));
//  handle Api Requests to use task routes
app.use('/api/user',require('./routers/task'));


// for production mode
connectDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`Successfull Connected With the Port:${PORT}`);
    });
});