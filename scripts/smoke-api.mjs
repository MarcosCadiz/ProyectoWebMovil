import { createApp } from '../server/app.js';
import { getPool } from '../server/config/database.js';
import { ensureDatabaseSchema } from '../server/services/databaseService.js';
import { seedInitialUsers } from '../server/services/seedService.js';

await ensureDatabaseSchema();
await seedInitialUsers();

const app = createApp();
const server = app.listen(0);
const registrationRut = `70${Date.now().toString().slice(-6)}-k`;

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

  const registered = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Usuario Smoke',
      rut: registrationRut,
      email: 'smoke@example.com',
      password: 'SmokeTest123',
      role: 'usuario',
    }),
  });
  assert(registered.response.status === 201, 'registrar usuario');

  const registeredLogin = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      rut: registrationRut.replaceAll('.', ''),
      password: 'SmokeTest123',
    }),
  });
  assert(registeredLogin.response.status === 200, 'login usuario registrado');

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

  const paginated = await request('/tramites?limit=1&offset=0', { headers: userAuth });
  assert(paginated.response.status === 200, 'tramites paginados');
  assert(paginated.body.tramites.length <= 1, 'limite de paginacion');
  assert(paginated.body.pagination.limit === 1, 'metadata paginacion');

  const created = await request('/tramites', {
    method: 'POST',
    headers: userAuth,
    body: JSON.stringify({
      tipo: 'Permiso de Obra Menor',
      descripcion: 'Solicitud creada por smoke test',
      direccion: 'Av. Test 123, Santo Domingo',
      observaciones: 'Sin observaciones del solicitante',
      contenidoSolicitud: 'Formulario digital generado por smoke test',
      documents: [
        {
          name: 'Plano_Test.pdf',
          category: 'Plano',
          size: '120 KB',
          content: 'Contenido demo del plano enviado por el usuario',
        },
      ],
    }),
  });
  assert(created.response.status === 201, 'crear tramite');
  assert(created.body.tramite.id, 'tramite id');
  assert(created.body.tramite.documents.length === 1, 'documento persistido');

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

  const decided = await request(`/tramites/${tramiteId}/decision`, {
    method: 'POST',
    headers: staffAuth,
    body: JSON.stringify({
      decision: 'Aprobado',
      fundamento: 'Cumple los criterios revisados en la prueba automatizada.',
      document: 'Resolucion de aprobacion generada por smoke test.',
      nextSteps: ['Firmar digitalmente', 'Presentar ante DOM'],
      folio: 'RES-SMOKE-001',
    }),
  });
  assert(decided.response.status === 201, 'emitir resolucion');
  assert(decided.body.tramite.estado === 'Aprobado', 'tramite aprobado');
  assert(decided.body.tramite.resolution.folio === 'RES-SMOKE-001', 'resolucion persistida');

  const resolvedForUser = await request(`/tramites/${tramiteId}`, { headers: userAuth });
  assert(resolvedForUser.body.tramite.resolution.nextSteps.length === 2, 'pasos posteriores visibles');

  const notificationList = await request('/notifications', { headers: userAuth });
  assert(notificationList.response.status === 200, 'listar notificaciones');
  assert(
    notificationList.body.notifications.some((notification) => notification.tramiteId === tramiteId),
    'notificacion de resolucion',
  );

  const markAllRead = await request('/notifications/read-all', {
    method: 'PATCH',
    headers: userAuth,
  });
  assert(markAllRead.response.status === 204, 'marcar notificaciones leidas');

  const unsafePayload = await request('/tramites', {
    method: 'POST',
    headers: userAuth,
    body: JSON.stringify({
      tipo: '<script>alert(1)</script>',
      descripcion: 'Intento XSS',
    }),
  });
  assert(unsafePayload.response.status === 400, 'xss bloqueado');
  assert(unsafePayload.body.error === 'UNSAFE_INPUT', 'codigo xss');

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
    'api-evidence-ok: registro/login, usuarios demo, CRUD, JWT/roles, documentos, resoluciones, notificaciones, paginacion, XSS y errores',
  );
} finally {
  server.close();
  const pool = getPool();
  if (pool) {
    await pool.query(
      "DELETE FROM users WHERE regexp_replace(lower(rut), '[^0-9k]', '', 'g') = $1",
      [registrationRut.toLowerCase().replace(/[^0-9k]/g, '')],
    );
  }
}
