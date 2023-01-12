const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/', todoController.addTodo)
router.post('/:id', todoController.updateTodo)
router.get('/:id', todoController.getTodosByUser)
router.get('/done/:id', todoController.getPrevTodosByUser)
router.delete('/done/:id', todoController.deletePrevTodosByUser)
router.get('/habit/:id', todoController.getHabitsOfTodo)

module.exports = router