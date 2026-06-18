ALTER TABLE tramites ADD COLUMN IF NOT EXISTS direccion TEXT;
ALTER TABLE tramites ADD COLUMN IF NOT EXISTS observaciones TEXT;
ALTER TABLE tramites ADD COLUMN IF NOT EXISTS contenido_solicitud TEXT;

ALTER TABLE tramite_documentos ADD COLUMN IF NOT EXISTS tamano VARCHAR(40);
ALTER TABLE tramite_documentos ADD COLUMN IF NOT EXISTS contenido TEXT;

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

CREATE INDEX IF NOT EXISTS idx_resoluciones_tramite ON tramite_resoluciones(tramite_id);
