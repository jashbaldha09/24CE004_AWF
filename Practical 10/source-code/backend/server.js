const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

// Load listeners
require('./events/taskListeners');

const app = express();
const PORT = process.env.PORT || 5002; // Use port 5002 to avoid collision

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

let serverInstance = null;

const startServer = () => {
  return new Promise((resolve) => {
    serverInstance = app.listen(PORT, () => {
      console.log(`Practical 10 Event-Driven Server running on port ${PORT} - Student: Jashkumar Baldha (24CE004)`);
      resolve(serverInstance);
    });
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
