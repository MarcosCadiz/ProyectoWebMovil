import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.API_PORT || process.env.PORT || 4000),
  corsOrigins: (process.env.CORS_ORIGIN || 'http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  jwtIssuer: process.env.JWT_ISSUER || 'dom-santo-domingo-api',
  jwtAudience: process.env.JWT_AUDIENCE || 'dom-santo-domingo-client',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',
  databaseUrl: process.env.DATABASE_URL || '',
  databaseSsl: process.env.DATABASE_SSL !== 'false',
};
