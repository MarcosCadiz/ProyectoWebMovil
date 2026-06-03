-- Ejecutar despues de schema.sql.
-- Las contrasenas deben guardarse siempre con bcrypt.
-- Estos hashes son referenciales para ambiente de desarrollo.

INSERT INTO users (name, rut, password_hash, role)
VALUES
  (
    'Juan Perez',
    '12.345.678-9',
    '$2b$10$2btyZFLtxgTSgVax5iKwo.S80Eo7gNcrJ8IAkzSNYYDn3ddJSGH56',
    'usuario'
  ),
  (
    'Funcionario DOM',
    '9.876.543-2',
    '$2b$10$2btyZFLtxgTSgVax5iKwo.S80Eo7gNcrJ8IAkzSNYYDn3ddJSGH56',
    'funcionario'
  )
ON CONFLICT (rut) DO NOTHING;

INSERT INTO tramites (codigo, tipo, estado, solicitante_id, descripcion)
SELECT '#45092', 'Permiso de Obra Menor', 'En Revision', users.id, 'Tramite de demostracion para revision DOM.'
FROM users
WHERE users.rut = '12.345.678-9'
ON CONFLICT (codigo) DO NOTHING;
