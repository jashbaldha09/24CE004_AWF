const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Route-level caching: GET /api/tasks is cached for 60 seconds
router.get('/', cacheMiddleware('tasks', 60), taskController.getAllTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
