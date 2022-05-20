const Todo = require('../database/schema/todo.schema');

const addTodo = async (req, res) => {
  const { body } = req;
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
      status: 'error',
      message: e.message,
    });
  }
};

const getTodo = async (req, res) => {
  const documents = await Todo.find();
  res.status(200).json({
    message: 'data found',
    data: documents,
  });
};

const updateTodo = async (req, res) => {
  const { id } = req.query;
  const { body } = req;

  const updatedTodo = await Todo.findByIdAndUpdate(id, body, { new: true });

  res.status(200).json({
    status: 'success',
    message: `Todo with id ${id} updated , successfully`,
    data: updatedTodo,
  });
};

module.exports = {
  addTodo,
  getTodo,
  updateTodo,
};
