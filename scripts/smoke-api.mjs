import { createApp } from '../server/app.js';
import { ensureDatabaseSchema } from '../server/services/databaseService.js';
import { seedInitialUsers } from '../server/services/seedService.js';

await ensureDatabaseSchema();
await seedInitialUsers();

const app = createApp();
const server = app.listen(0);

function getBaseUrl() {
  const { port } = server.address();
  return `http://127.0.0.1:${port}/api`;
}

async function request(path, options = {}) {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return { response, body: null };
  }

  const body = await response.json();
  return { response, body };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

try {
  const health = await request('/health');
  assert(health.response.status === 200, 'health status');
  assert(health.body.ok === true, 'health ok');

  const userLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      rut: '12.345.678-9',
      password: 'Usuario123',
    }),
  });
  assert(userLogin.response.status === 200, 'login usuario');
  assert(userLogin.body.accessToken, 'usuario token');

  const staffLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      rut: '9.876.543-2',
      password: 'Funcionario123',
    }),
  });
  assert(staffLogin.response.status === 200, 'login funcionario');
  assert(staffLogin.body.accessToken, 'funcionario token');

  const userAuth = { Authorization: `Bearer ${userLogin.body.accessToken}` };
  const staffAuth = { Authorization: `Bearer ${staffLogin.body.accessToken}` };

  const me = await request('/users/me', { headers: userAuth });
  assert(me.response.status === 200, 'users/me');
  assert(me.body.user.role === 'usuario', 'users/me role');

  const users = await request('/users', { headers: staffAuth });
  assert(users.response.status === 200, 'users');
  assert(Array.isArray(users.body.users), 'users array');

  const created = await request('/tramites', {
    method: 'POST',
    headers: userAuth,
    body: JSON.stringify({
      tipo: 'Permiso de Obra Menor',
      descripcion: 'Solicitud creada por smoke test',
    }),
  });
  assert(created.response.status === 201, 'crear tramite');
  assert(created.body.tramite.id, 'tramite id');

  const tramiteId = created.body.tramite.id;

  const found = await request(`/tramites/${tramiteId}`, { headers: userAuth });
  assert(found.response.status === 200, 'obtener tramite');
  assert(found.body.tramite.id === tramiteId, 'obtener tramite id');

  const updated = await request(`/tramites/${tramiteId}`, {
    method: 'PATCH',
    headers: userAuth,
    body: JSON.stringify({
      estado: 'En Revision',
      descripcion: 'Solicitud actualizada por smoke test',
    }),
  });
  assert(updated.response.status === 200, 'actualizar tramite');
  assert(updated.body.tramite.estado === 'En Revision', 'estado actualizado');

  const deleted = await request(`/tramites/${tramiteId}`, {
    method: 'DELETE',
    headers: userAuth,
  });
  assert(deleted.response.status === 204, 'eliminar tramite');

  const missingType = await request('/tramites', {
    method: 'POST',
    headers: userAuth,
    body: JSON.stringify({
      descripcion: 'Debe fallar por falta de tipo',
    }),
  });
  assert(missingType.response.status === 400, 'tramite sin tipo status');
  assert(missingType.body.error === 'TRAMITE_TYPE_REQUIRED', 'tramite sin tipo error');

  console.log(
    'api-evidence-ok: health, login usuario, login funcionario, users/me, users, crear/obtener/actualizar/eliminar tramite, error controlado',
  );
} finally {
  server.close();
}
