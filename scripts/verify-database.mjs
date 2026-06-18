import 'dotenv/config';
import pg from 'pg';
import { normalizeDatabaseUrl } from '../server/config/connectionString.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL_NOT_CONFIGURED');
}

const pool = new pg.Pool({
  connectionString: normalizeDatabaseUrl(process.env.DATABASE_URL),
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: true },
});

try {
  const connection = await pool.query('SELECT current_database() AS database, NOW() AS server_time');
  const tables = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN ('users', 'tramites', 'tramite_documentos', 'tramite_resoluciones')
    ORDER BY table_name
  `);

  console.log(JSON.stringify({
    ok: true,
    database: connection.rows[0].database,
    serverTime: connection.rows[0].server_time,
    tables: tables.rows.map((row) => row.table_name),
  }));
} finally {
  await pool.end();
}
