import pg from 'pg';
import { env } from './env.js';
import { normalizeDatabaseUrl } from './connectionString.js';

let pool;
let databaseAvailable = true;

export function getPool() {
  if (!env.databaseUrl || !databaseAvailable) {
    return null;
  }

  if (!pool) {
    pool = new pg.Pool({
      connectionString: normalizeDatabaseUrl(env.databaseUrl),
      ssl: env.databaseSsl ? { rejectUnauthorized: true } : false,
    });
  }

  return pool;
}

export function isDatabaseEnabled() {
  return Boolean(env.databaseUrl && databaseAvailable);
}

export function disableDatabase() {
  databaseAvailable = false;
}
