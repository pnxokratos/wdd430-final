const sequenceGenerator = require('./sequenceGenerator');
const Task = require('../models/task');

var express = require('express');
var router = express.Router();
module.exports = router; 


// get method
router.get('/', (req, res, next) => {
    Task.find()
    .then(taskList => {
        res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks: taskList
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'Sorry, An error occured',
            error: error
        })
    })

 });

 //This method is called whenever an HTTP POST request is sent on the /tasks route.
 router.post('/', (req, res, next) => {
    const maxTaskId = sequenceGenerator.nextId('tasks');
    const task = new Task({
      id: maxTaskId,
      content: req.body.content,
      date: req.body.date,
      isChecked: req.body.isChecked
    });
  
    task.save()
      .then(createdTask => {
        res.status(201).json({
          message: 'Task added successfully',
          task: createdTask
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });

    console.log(maxTaskId);
  });


  // Update an existing task
  router.put('/:id', (req, res, next) => {
    Task.findOne({ id: req.params.id })
      .then(task => {
        task.content = req.body.content;
        task.date = req.body.date;
        task.isChecked = req.body.isChecked;
  
        Task.updateOne({ id: req.params.id }, task)
          .then(result => {
            res.status(204).json({
              message: 'Task updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Task not found.',
          error: { task: 'Task not found'}
        });
      });
  });


  // this method is responsible for deleting a document
  router.delete("/:id", (req, res, next) => {
    Task.findOne({ id: req.params.id })
      .then(task => {
        Task.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Task deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Task not found.',
          error: { task: 'Task not found'}
        });
      });
  });