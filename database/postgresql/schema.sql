CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('usuario', 'funcionario');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tramite_estado') THEN
    CREATE TYPE tramite_estado AS ENUM ('Nueva', 'En Revision', 'Observado', 'Aprobado', 'Rechazado');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'documento_estado') THEN
    CREATE TYPE documento_estado AS ENUM ('Pendiente', 'Recibido', 'Observado', 'Aprobado');
  END IF;
END $$;

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
);

CREATE TABLE IF NOT EXISTS tramites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(32) NOT NULL UNIQUE,
  tipo VARCHAR(120) NOT NULL,
  estado tramite_estado NOT NULL DEFAULT 'Nueva',
  solicitante_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  funcionario_id UUID REFERENCES users(id) ON DELETE SET NULL,
  direccion TEXT,
  descripcion TEXT,
  observaciones TEXT,
  contenido_solicitud TEXT,
  fecha_ingreso TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tramite_documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tramite_id UUID NOT NULL REFERENCES tramites(id) ON DELETE CASCADE,
  nombre_archivo VARCHAR(180) NOT NULL,
  tipo_documento VARCHAR(120) NOT NULL,
  url_archivo TEXT,
  tamano VARCHAR(40),
  contenido TEXT,
  estado documento_estado NOT NULL DEFAULT 'Pendiente',
  observacion TEXT,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tramite_resoluciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tramite_id UUID NOT NULL REFERENCES tramites(id) ON DELETE CASCADE,
  funcionario_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  decision VARCHAR(20) NOT NULL CHECK (decision IN ('Aprobado', 'Rechazado', 'Observado')),
  fundamento TEXT NOT NULL,
  documento TEXT NOT NULL,
  pasos_posteriores JSONB NOT NULL DEFAULT '[]'::jsonb,
  folio VARCHAR(80) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tramite_mensajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tramite_id UUID NOT NULL REFERENCES tramites(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  mensaje TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tramite_id UUID REFERENCES tramites(id) ON DELETE CASCADE,
  title VARCHAR(140) NOT NULL,
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id UUID,
  action VARCHAR(80) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_tramites_solicitante ON tramites(solicitante_id);
CREATE INDEX IF NOT EXISTS idx_tramites_funcionario ON tramites(funcionario_id);
CREATE INDEX IF NOT EXISTS idx_tramites_estado ON tramites(estado);
CREATE INDEX IF NOT EXISTS idx_documentos_tramite ON tramite_documentos(tramite_id);
CREATE INDEX IF NOT EXISTS idx_resoluciones_tramite ON tramite_resoluciones(tramite_id);
CREATE INDEX IF NOT EXISTS idx_mensajes_tramite ON tramite_mensajes(tramite_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_events(entity_type, entity_id);
