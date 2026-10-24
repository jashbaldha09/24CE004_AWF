const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint for Docker HEALTHCHECK
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'awf-backend', timestamp: new Date().toISOString() });
});

let tasks = [
  { id: '1', title: 'Containerize Backend with Docker Alpine', status: 'Healthy', network: 'app-network' },
  { id: '2', title: 'Multi-Stage Build for React Frontend', status: 'Healthy', network: 'app-network' },
  { id: '3', title: 'Persist MongoDB Data via Named Volume', status: 'Healthy', network: 'app-network' }
];

app.get('/api/tasks', (req, res) => {
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: String(Date.now()),
    title: title || 'Dockerized Task',
    status: 'Healthy',
    network: 'app-network'
  };
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

let serverInstance = null;

const startServer = async () => {
  return new Promise((resolve) => {
    serverInstance = app.listen(PORT, () => {
      console.log(`Practical 11 Backend running on port ${PORT} - Student: Jashkumar Baldha (24CE004)`);
      resolve(serverInstance);
    });
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
