const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validateMiddleware');

// Protect all task routes with authMiddleware
router.use(authMiddleware);

router.get('/', taskController.getTasks);
router.post('/', validateTask, taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
