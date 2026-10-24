const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: '1', title: 'Initialize Git Repository for TaskFlow', status: 'completed' },
  { id: '2', title: 'Configure GitHub Actions CI Pipeline', status: 'in-progress' }
];

// Health endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'task-api', timestamp: new Date().toISOString() });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

// POST task
app.post('/api/tasks', (req, res) => {
  const { title, status } = req.body;
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Task title is required.' });
  }

  const newTask = {
    id: String(Date.now()),
    title: title.trim(),
    status: status || 'pending'
  };

  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found.' });
});

module.exports = app;
