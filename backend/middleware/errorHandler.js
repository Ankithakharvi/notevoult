// Middleware to handle 404 Not Found errors (must be placed BEFORE other routes)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Generic error handler middleware (must be placed AFTER all routes)
const errorHandler = (err, req, res, next) => {
  // If status code is 200 (default) it means Express didn't explicitly set one, so use 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Only send the stack trace in development for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };