import pg from 'pg';
import { env } from './env.js';

let pool;
let databaseAvailable = true;

export function getPool() {
  if (!env.databaseUrl || !databaseAvailable) {
    return null;
  }

  if (!pool) {
    pool = new pg.Pool({
      connectionString: env.databaseUrl,
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
