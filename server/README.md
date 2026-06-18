# API DOM Santo Domingo

API REST Node.js/Express para autenticación, usuarios, trámites, documentos, resoluciones y notificaciones.

## Inicio

Desde la raíz:

```bash
npm install
Copy-Item .env.example .env
npm run dev:api
```

Base URL:

```text
http://127.0.0.1:4000/api
```

## Configuración

```dotenv
API_PORT=4000
CORS_ORIGIN=http://127.0.0.1:5173
JWT_ISSUER=dom-santo-domingo-api
JWT_AUDIENCE=dom-santo-domingo-client
JWT_EXPIRES_IN=2h
DATABASE_URL=postgresql://USUARIO:CONTRASENA@HOST/NOMBRE_BASE
DATABASE_SSL=true
```

`CORS_ORIGIN` admite una lista separada por comas. Use `DATABASE_SSL=false` para PostgreSQL local sin TLS.

## Capas

```text
routes → middleware → controllers → services/data → PostgreSQL
```

- `app.js`: middleware global y rutas.
- `config`: entorno, conexión y JWT.
- `middleware`: autenticación, rol, seguridad y errores.
- `controllers`: respuestas HTTP.
- `services`: validación, tokens, hashing y esquema.
- `data`: persistencia PostgreSQL/fallback.

## Endpoints

```text
GET  /health
GET  /jwks
POST /auth/register
POST /auth/login

GET  /users/me
GET  /users

GET    /tramites
POST   /tramites
GET    /tramites/:id
PUT    /tramites/:id
PATCH  /tramites/:id
DELETE /tramites/:id
POST   /tramites/:id/decision

GET   /notifications
PATCH /notifications/:id/read
PATCH /notifications/read-all
```

Excepto health, JWKS y autenticación, las rutas requieren:

```text
Authorization: Bearer <accessToken>
```

`GET /users` y `POST /tramites/:id/decision` requieren rol `funcionario`.

## Seguridad

- bcrypt.
- JWT RS256 y JWKS.
- Control de rol y propiedad.
- CORS por lista blanca.
- Rate limiting.
- Payload máximo de 1 MB.
- Validación de datos y bloqueo XSS.
- Cabeceras defensivas.
- Consultas SQL parametrizadas.
- TLS verificable para PostgreSQL remoto.

## Persistencia

```bash
npm run db:migrate
npm run db:verify
```

Si la base no está disponible, la API usa memoria temporal y registra una advertencia. Este modo no debe utilizarse como persistencia productiva.

## Pruebas

```bash
npm run test:api
```

La prueba cubre JWT, roles, CRUD, documentos, resoluciones, notificaciones, paginación, XSS y errores controlados.

Documentación detallada: [../docs/api-endpoints.md](../docs/api-endpoints.md).
