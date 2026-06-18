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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tramites (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        codigo VARCHAR(32) NOT NULL UNIQUE,
        tipo VARCHAR(120) NOT NULL,
        estado VARCHAR(40) NOT NULL DEFAULT 'Nueva',
        solicitante_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
        funcionario_id UUID REFERENCES users(id) ON DELETE SET NULL,
        direccion TEXT,
        descripcion TEXT,
        observaciones TEXT,
        contenido_solicitud TEXT,
        fecha_ingreso TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query('ALTER TABLE tramites ADD COLUMN IF NOT EXISTS direccion TEXT');
    await pool.query('ALTER TABLE tramites ADD COLUMN IF NOT EXISTS observaciones TEXT');
    await pool.query('ALTER TABLE tramites ADD COLUMN IF NOT EXISTS contenido_solicitud TEXT');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tramite_documentos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tramite_id UUID NOT NULL REFERENCES tramites(id) ON DELETE CASCADE,
        nombre_archivo VARCHAR(180) NOT NULL,
        tipo_documento VARCHAR(120) NOT NULL,
        tamano VARCHAR(40),
        contenido TEXT,
        estado VARCHAR(40) NOT NULL DEFAULT 'Recibido',
        observacion TEXT,
        uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query('ALTER TABLE tramite_documentos ADD COLUMN IF NOT EXISTS tamano VARCHAR(40)');
    await pool.query('ALTER TABLE tramite_documentos ADD COLUMN IF NOT EXISTS contenido TEXT');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tramite_resoluciones (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tramite_id UUID NOT NULL REFERENCES tramites(id) ON DELETE CASCADE,
        funcionario_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
        decision VARCHAR(20) NOT NULL,
        fundamento TEXT NOT NULL,
        documento TEXT NOT NULL,
        pasos_posteriores JSONB NOT NULL DEFAULT '[]'::jsonb,
        folio VARCHAR(80) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        tramite_id UUID REFERENCES tramites(id) ON DELETE CASCADE,
        title VARCHAR(140) NOT NULL,
        body TEXT NOT NULL,
        read_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await pool.query('CREATE INDEX IF NOT EXISTS idx_tramites_solicitante ON tramites(solicitante_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_tramites_estado ON tramites(estado)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_documentos_tramite ON tramite_documentos(tramite_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_resoluciones_tramite ON tramite_resoluciones(tramite_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, created_at DESC)');
  } catch (error) {
    disableDatabase();
    console.warn('PostgreSQL no disponible. La API continuara usando datos en memoria.');
  }
}
