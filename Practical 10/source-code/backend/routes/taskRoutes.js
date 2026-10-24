const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { getLogs, clearLogs } = require('../events/taskListeners');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

router.get('/logs', (req, res) => {
  res.status(200).json({ success: true, data: getLogs() });
});

router.post('/logs/clear', (req, res) => {
  clearLogs();
  res.status(200).json({ success: true, message: 'Logs cleared' });
});

module.exports = router;
