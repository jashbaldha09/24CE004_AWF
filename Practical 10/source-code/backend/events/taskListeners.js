const taskEmitter = require('./taskEmitter');

const eventLogs = [];

const logEvent = (source, message, details = {}) => {
  const entry = {
    id: Date.now() + Math.random(),
    timestamp: new Date().toISOString(),
    source,
    message,
    details
  };
  eventLogs.unshift(entry);
  if (eventLogs.length > 50) eventLogs.pop();
  return entry;
};

// Listener 1: Fast Audit Logger (Microtask / Synchronous queue)
taskEmitter.on('task:created', (task) => {
  const log = logEvent('AuditLogger', `Task ID ${task.id} ("${task.title}") recorded in audit log.`, { taskId: task.id, user: task.userId });
  console.log(`[AUDIT LOG ${log.timestamp}] ${log.message}`);
});

// Listener 2: Asynchronous Email Notification Dispatch (Simulated 200ms background I/O)
taskEmitter.on('task:created', async (task) => {
  const startTime = new Date().toISOString();
  logEvent('EmailService (Async)', `Initiating background email dispatch for "${task.title}"...`, { status: 'pending' });
  console.log(`[EMAIL DISPATCH ${startTime}] Starting simulated async email send...`);

  // Non-blocking artificial delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const finishTime = new Date().toISOString();
  const log = logEvent('EmailService (Async)', `Email successfully sent to assignee for task ID ${task.id}.`, { status: 'delivered', duration: '200ms' });
  console.log(`[EMAIL DISPATCH ${finishTime}] Email completed in background.`);
});

// Listener 3: Task Deletion Cleanup
taskEmitter.on('task:deleted', (taskId) => {
  const log = logEvent('AuditLogger', `Task ${taskId} permanently deleted. Cleanup triggered.`, { taskId });
  console.log(`[AUDIT LOG ${log.timestamp}] ${log.message}`);
});

// Listener 4: Error Handler
taskEmitter.on('error', (err) => {
  const log = logEvent('ErrorHandler', `Background listener error: ${err.message}`, { level: 'error' });
  console.error(`[EVENT ERROR ${log.timestamp}] ${log.message}`);
});

module.exports = {
  getLogs: () => eventLogs,
  clearLogs: () => { eventLogs.length = 0; }
};
