const Task = require('../models/taskModel');
const sendMail  = require('../middleWare/nodemailer');


// creating new task 
module.exports.createTask = async (req , res) => {

    const {name , description} = req.body;
    const userId = req.user.id;
    try{
        const newTask = await new Task({
            name,
            description,
            user:userId
        });

        const task = await newTask.save();

        // sending email notification to user when created new task
        const subject = `You Created A Task`;
        const html = `<p>Your Task "${task}" has been Created.</p>`;
        sendMail(user.email, subject, html);

        return res.status(200).json({
            message: 'New Task Created Successfully',
            task
        });
    }catch(error){
        return res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
};

// get all tasks list for authenticated user with pagination and sorting 

module.exports.allTaskList = async (req, res) => {
    // pagination and sorting  crediantials
    const { page = 1 ,limit = 10 ,sort ='-createdAt'} = req.query;
    try{
        const tasks = await Task.find({
            user: req.user.id
        })
        .sort(sort)
        .limit(limit * 1 )
        .skip((page -1) * limit)
        .exec();

        return res.status(200).json({
            message: 'All Tasks Fetched Successfully',
            tasks
        });
    }catch(error){
        return res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
};

// get any specific task using ID for authenticated user

module.exports.specificTask = async (req,res) =>{
    //specific task id
    const taskId = req.params.id;
    try{
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({
                message: "No Task found with given ID"
            });
        }

        if(task.user.toString() !== req.user.id){
            return res.status(401).json({
                message: "User Not Login , Please Login first"
            });
        }

        return res.status(200).json({
            message: 'Your Specific Task Fetched Successfully',
            task
        });

    }catch(error){
        return res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
};


// update task by ID for authenticated user

module.exports.updateTask = async (req ,res) =>{
    const { name , description } = req.body;

    // building object of taskfield

    const taskFields = {};
    if(name) {
        taskFields.name = name;
    }
    if(description){
        taskFields.description = description;
    }
    if(status){
        taskFields.status = status;
    }
    const taskId = req.params.id;
    try{
        let task = await Task.findById(taskId);
        if(!task){
            return res.status(401).json({
                message: 'task Not Found'
            });
        }
        
        if(task.user.toString() !== req.user.id){
            return res.status(401).json({
                message: "User Not Login , Please Login first"
            });
        }
        task  = await Task.findByIdAndUpdate(
            req.params.id,
            {$set: taskFields},
            {new: true}
        );

        // sending email notification to user when updated task
        const subject = `You Updated A Task`;
        const html = `<p>Your Task "${task}" has been Updated.</p>`;
        sendMail(user.email, subject, html);

        return res.status(200).json({
            message: 'Task Updated Successfully',
            task
        });
    }catch(error){
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

// deleting task by ID for authenticated user

module.exports.deleteTask = async (req, res) =>{
    const taskId = req.params.id;
    try{

        let task = await Task.findById(taskId);
        if(!task){
            return res.status(401).json({
                message: 'task Not Found'
            });
        }
        
        if(task.user.toString() !== req.user.id){
            return res.status(401).json({
                message: "User Not Login , Please Login first"
            });
        }

        await Task.findByIdAndRemove(taskId);

        // sending email notification to user when Deleted 
        const subject = `You Deleted A Task`;
        const html = `<p>Your Task "${task}" has been Deleted.</p>`;
        sendMail(user.email, subject, html);
 
        return res.status(200).json({
            message: 'Task Removed Successfully'
        });

    }catch(error){
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};