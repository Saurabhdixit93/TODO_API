// requiring mongoose to create task schema
const mongoose = require('mongoose');

// creating schema for task
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status:{
        type: String,
        enum:['completed' , 'pending'],
        default:'pending',
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
},{
    timestamps: true
});

// exporting for global use
module.exports = mongoose.model('Task' , taskSchema);