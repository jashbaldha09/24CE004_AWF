const taskEmitter = require('../events/taskEmitter');

let tasks = [
  { id: '1', title: 'Setup Native EventEmitter', userId: '24CE004', createdAt: new Date().toISOString() },
  { id: '2', title: 'Verify Non-Blocking Response Time', userId: '24CE004', createdAt: new Date().toISOString() }
];

exports.getAllTasks = (req, res) => {
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
};

exports.createTask = (req, res) => {
  const { title, userId, simulateError } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, error: 'Task title is required.' });
  }

  const newTask = {
    id: String(Date.now()),
    title: title.trim(),
    userId: userId || '24CE004_Jash',
    createdAt: new Date().toISOString()
  };

  tasks.unshift(newTask);

  const responseTime = new Date().toISOString();
  console.log(`[API RESPONSE ${responseTime}] HTTP 201 Created sent to client immediately.`);

  // Return immediate HTTP 201 response before event listeners finish
  res.status(201).json({
    success: true,
    message: 'Task created successfully. Background notifications emitted.',
    data: newTask,
    apiResponseTime: responseTime
  });

  // Emit decoupled asynchronous event on next event loop tick
  process.nextTick(() => {
    if (simulateError) {
      taskEmitter.emit('error', new Error('Simulated background SMTP connection failure for testing!'));
    } else {
      taskEmitter.emit('task:created', newTask);
    }
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== id);

  res.status(200).json({
    success: true,
    message: `Task ${id} deleted.`
  });

  process.nextTick(() => {
    taskEmitter.emit('task:deleted', id);
  });
};
