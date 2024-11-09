const express = require("express");
const router = express.Router();
const {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../Controller/todoController");

router.get("/", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
