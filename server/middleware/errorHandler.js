const errorStatus = {
  INVALID_CREDENTIALS: 401,
  MISSING_CREDENTIALS: 400,
  MISSING_REQUIRED_FIELDS: 400,
  PASSWORD_TOO_SHORT: 400,
  USER_ALREADY_EXISTS: 409,
};

export function errorHandler(error, req, res, next) {
  if (!error) return next();

  const status = errorStatus[error.message] || 500;

  return res.status(status).json({
    error: error.message || 'INTERNAL_SERVER_ERROR',
  });
}
