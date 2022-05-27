const express = require('express');

const todoController = require('../controllers/todo.controller');

const { addTodo, getTodo, updateTodo, deleteTodo } = todoController;

const router = express.Router();

router.route('/').get(getTodo).post(addTodo).patch(updateTodo).delete(deleteTodo);

module.exports = router;
