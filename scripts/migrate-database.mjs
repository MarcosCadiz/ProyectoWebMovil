import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import pg from 'pg';
import { normalizeDatabaseUrl } from '../server/config/connectionString.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL_NOT_CONFIGURED');
}

const sql = await readFile(new URL('../database/postgresql/schema.sql', import.meta.url), 'utf8');
const pool = new pg.Pool({
  connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: true },
});

try {
  await pool.query(sql);
  console.log('database-migration-ok');
} finally {
  await pool.end();
}
