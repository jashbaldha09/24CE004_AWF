const cacheService = require('../config/cache');

// In-memory simulation collection of MongoDB Atlas tasks
let tasks = [
  { id: '1', title: 'Initialize NodeCache Singleton with 60s TTL', category: 'Optimization', completed: true },
  { id: '2', title: 'Benchmark Sub-Millisecond Cache Response', category: 'Performance', completed: true },
  { id: '3', title: 'Enforce Write-Invalidation Pipeline', category: 'Integrity', completed: false }
];

exports.getAllTasks = async (req, res) => {
  // Simulate database I/O latency (45ms)
  await new Promise((resolve) => setTimeout(resolve, 45));
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

exports.createTask = async (req, res) => {
  const { title, category } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Task title is required.' });
  }

  const newTask = {
    id: String(Date.now()),
    title: title.trim(),
    category: category || 'General',
    completed: false
  };

  tasks.push(newTask);

  // Invalidate cached query results immediately on write operation
  cacheService.flush();
  console.log('[Cache Service]: Cache invalidated due to CREATE operation.');

  res.status(201).json({
    success: true,
    message: 'Task created and cache flushed.',
    data: newTask
  });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const initialCount = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === initialCount) {
    return res.status(404).json({ success: false, error: 'Task not found.' });
  }

  // Invalidate cache
  cacheService.flush();
  console.log(`[Cache Service]: Cache invalidated due to DELETE operation on task ${id}.`);

  res.status(200).json({
    success: true,
    message: `Task ${id} deleted and cache flushed.`
  });
};
