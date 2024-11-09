const Todo = require("../models/Todos");

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.find({ userId: req.user }).sort({ deadline: 1 });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { text, deadline, priority } = req.body;

    if (!deadline) {
      return res.status(400).json({ message: "Deadline is required" });
    }

    const newTodo = new Todo({
      text,
      userId: req.user,
      priority: priority || false,
      deadline,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== req.user) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const { text, priority, deadline } = req.body;

    if (text) todo.text = text;
    if (priority !== undefined) todo.priority = priority;
    if (deadline) todo.deadline = deadline;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== req.user) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
