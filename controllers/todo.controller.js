const Todo = require('../database/schema/todo.schema');

const addTodo = async (req, res) => {
  const { body } = req.body;
  try {
    const doc = await Todo.create({
      title: body.title,
      task: body.task,
      email: body.email,
      person: body.person,
    });

    res.status(200).json({
      data: doc,
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      status: 'hello',
      message: e.message,
    });
  }
};

const getTodo = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  addTodo,
};
