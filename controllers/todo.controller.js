const Todo = require('../database/schema/todo.schema');

const addTodo = _catcher(async (req, res, next) => {
  const { body } = req;

  const doc = await Todo.create({
    title: body.title,
    task: body.task,
    email: body.email,
    person: body.person,
  });

  res.status(200).json({
    message: 'Todo added successfully',
    data: doc,
    status: 'success',
  });
});

const getTodo = _catcher(async (req, res) => {
  const { body } = req;

  try {
    const documents = await Todo.find(body);
    res.status(200).json({
      message: 'data found',
      data: documents,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'error',
      message: e.message,
    });
  }
});

const updateTodo = _catcher(async (req, res) => {
  const { id } = req.query;

  const { body } = req;

  const updatedTodo = await Todo.findByIdAndUpdate(id, body, { new: true });

  res.status(200).json({
    status: 'success',
    message: `Todo with id ${id} updated , successfully`,
    data: updatedTodo,
  });
});

const deleteTodo = _catcher(async (req, res) => {
  const { id } = req.query;

  await Todo.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    message: `Todo with id ${id} deleted , successfully`,
  });
});

module.exports = {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
