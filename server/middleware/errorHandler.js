const errorStatus = {
  INVALID_CREDENTIALS: 401,
  MISSING_CREDENTIALS: 400,
  MISSING_REQUIRED_FIELDS: 400,
  INVALID_ROLE: 400,
  PASSWORD_TOO_SHORT: 400,
  TRAMITE_NOT_FOUND: 404,
  TRAMITE_TYPE_REQUIRED: 400,
  TRAMITE_UPDATE_REQUIRED: 400,
  USER_ALREADY_EXISTS: 409,
};

export function errorHandler(error, req, res, next) {
  if (!error) return next();

  const status = errorStatus[error.message] || 500;
  const errorCode = status === 500 ? 'INTERNAL_SERVER_ERROR' : error.message;

  return res.status(status).json({
    error: errorCode,
  });
}
