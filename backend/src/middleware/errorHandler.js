export default (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);

  // PostgreSQL errors
  if (err.code === '23505') {
    return res.status(409).json({
      status:  'error',
      message: 'Duplicate entry — resource already exists'
    });
  }
  if (err.code === '22P02') {
    return res.status(400).json({
      status:  'error',
      message: 'Invalid data format'
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status:  'error',
    message: err.isOperational
      ? err.message
      : 'Internal server error'
  });
};