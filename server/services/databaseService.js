import { disableDatabase, getPool, isDatabaseEnabled } from '../config/database.js';

export async function ensureDatabaseSchema() {
  if (!isDatabaseEnabled()) {
    return;
  }

  const pool = getPool();

  try {
    await pool.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
          CREATE TYPE user_role AS ENUM ('usuario', 'funcionario');
        END IF;
      END $$
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(120) NOT NULL,
        rut VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(160),
        department VARCHAR(120),
        password_hash VARCHAR(255) NOT NULL,
        role user_role NOT NULL DEFAULT 'usuario',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(160)');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS department VARCHAR(120)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)');
  } catch (error) {
    disableDatabase();
    console.warn('PostgreSQL no disponible. La API continuara usando datos en memoria.');
  }
}
