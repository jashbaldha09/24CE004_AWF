let tasks = [
  { id: 1, title: "Complete Practical 1", description: "Build component portfolio for Jash Baldha", completed: true },
  { id: 2, title: "Complete Practical 2", description: "Implement React Router & useState", completed: true },
  { id: 3, title: "Complete Practical 4", description: "Design REST API in Express (24CE004)", completed: false }
];
let nextId = 4;

const getAllTasks = (req, res) => {
  res.status(200).json({ success: true, count: tasks.length, data: tasks, student: "Jash Baldha (24CE004)" });
};

const getTaskById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    const error = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ success: true, data: task });
};

const createTask = (req, res, next) => {
  const { title, description } = req.body;
  if (!title) {
    const error = new Error("Task title is required");
    error.statusCode = 400;
    return next(error);
  }
  const newTask = { id: nextId++, title, description: description || "", completed: false };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask, student: "Jash Baldha (24CE004)" });
};

const updateTask = (req, res, next) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    const error = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    return next(error);
  }
  const { title, description, completed } = req.body;
  if (title !== undefined) tasks[taskIndex].title = title;
  if (description !== undefined) tasks[taskIndex].description = description;
  if (completed !== undefined) tasks[taskIndex].completed = Boolean(completed);

  res.status(200).json({ success: true, data: tasks[taskIndex] });
};

const deleteTask = (req, res, next) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    const error = new Error(`Task with ID ${id} not found`);
    error.statusCode = 404;
    return next(error);
  }
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.status(200).json({ success: true, message: "Task deleted successfully", data: deletedTask });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
