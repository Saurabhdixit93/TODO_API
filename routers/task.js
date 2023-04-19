// express importing
const express = require('express');
const router = express.Router();
//importing middleware and controller
const auth = require('../middleWare/authentication');
const taskController = require('../controllers/taskController');

// router for creat task 
router.post('/task' , auth ,taskController.createTask );
// router for fetch all task
router.get('/task' , auth ,taskController.allTaskList );
// router for fetch single task using ID
router.get('/task/:id' , auth , taskController.specificTask);
// router for update task by ID
router.put('/task/:id' , auth,taskController.updateTask);
// router for delete a task by ID
router.delete('/task/:id' ,auth , taskController.deleteTask);


// export for global use

module.exports = router;