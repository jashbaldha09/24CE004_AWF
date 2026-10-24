function globalErrorHandler(err, req, res, next) {
  console.error("Error Caught:", err.message);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: messages
    });
  }

  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      error: `Resource not found with ID ${err.value}`
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
}

module.exports = globalErrorHandler;
