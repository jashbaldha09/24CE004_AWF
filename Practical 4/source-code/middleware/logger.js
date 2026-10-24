function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - Student: Jash Baldha (24CE004)`);
  next();
}

module.exports = requestLogger;
