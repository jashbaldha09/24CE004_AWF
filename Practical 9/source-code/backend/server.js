const express = require('express');
const cors = require('cors');
const cacheService = require('./config/cache');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5001; // Port 5001 to avoid conflicts

app.use(cors());
app.use(express.json());

// Mount task routes with caching
app.use('/api/tasks', taskRoutes);

// Cache Monitoring and Metrics Endpoint
app.get('/api/cache/stats', (req, res) => {
  res.status(200).json({
    success: true,
    data: cacheService.getStats()
  });
});

let serverInstance = null;

const startServer = () => {
  return new Promise((resolve) => {
    serverInstance = app.listen(PORT, () => {
      console.log(`Practical 9 Caching Server running on port ${PORT} - Student: Jashkumar Baldha (24CE004)`);
      resolve(serverInstance);
    });
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
