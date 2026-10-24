const validateTask = (req, res, next) => {
  const { title, description } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Task title is required and cannot be empty.');
  } else if (title.trim().length < 3) {
    errors.push('Task title must be at least 3 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }

  req.body.title = title.trim();
  if (description) req.body.description = description.trim();
  next();
};

const validateAuth = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('A valid email address is required.');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }

  next();
};

module.exports = { validateTask, validateAuth };
