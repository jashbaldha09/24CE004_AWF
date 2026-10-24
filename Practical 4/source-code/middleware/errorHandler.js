function globalErrorHandler(err, req, res, next) {
  console.error("Global Error Caught:", err.stack || err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
    student: "Jash Baldha (24CE004)"
  });
}

module.exports = globalErrorHandler;
