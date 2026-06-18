# Plataforma DOM en Línea — Municipalidad de Santo Domingo

Aplicación web para digitalizar la gestión de solicitudes de la Dirección de Obras Municipales (DOM). Integra frontend React, API REST Express, autenticación JWT, persistencia PostgreSQL, notificaciones, revisión de expedientes, emisión de resoluciones y una configuración Docker reproducible.

## Equipo

- Milovan Fuentes
- Amaro Fibla
- Marcos Cadiz

## Estado del proyecto

El sistema implementa:

- Registro e inicio de sesión para ciudadanos y funcionarios.
- JWT firmado con RS256, rutas privadas y autorización por rol.
- CRUD de trámites desde la interfaz y la API.
- Adjuntos y formulario digital asociados al expediente.
- Bandeja DOM con búsqueda y filtrado.
- Checklist normativo y emisión de resoluciones.
- Notificaciones persistentes ante decisiones del funcionario.
- PostgreSQL local o remoto, con fallback temporal en memoria.
- Integración cartográfica con OpenStreetMap.
- Medidas de seguridad para CORS, XSS, SQL injection, payloads y rate limiting.
- Build de producción, smoke test automatizado y verificación de base de datos.
- Dockerfiles separados y Compose para frontend, API y PostgreSQL.

## Tecnologías

| Área | Tecnologías |
|---|---|
| Frontend | React 19, Vite, React Router, Axios, CSS |
| Backend | Node.js, Express 5 |
| Autenticación | bcrypt, JWT RS256, JWK/JWKS |
| Base de datos | PostgreSQL, driver `pg`, Neon compatible |
| Infraestructura | Docker, Docker Compose, Nginx |
| Pruebas | Smoke test Node.js, Postman/Insomnia |
| Servicio externo | OpenStreetMap |

## Arquitectura

```text
Navegador
   │
   ├── React + Vite
   │      └── Axios + interceptor JWT
   │
   └── /api
          └── Express
                ├── autenticación y roles
                ├── validación y seguridad
                ├── trámites, documentos y resoluciones
                ├── notificaciones
                └── PostgreSQL / fallback en memoria
```

## Estructura

```text
.
├── src/                         Frontend React
│   ├── components/              Componentes reutilizables
│   ├── features/                Módulos funcionales
│   ├── pages/                   Vistas
│   ├── routes/                  Rutas públicas y protegidas
│   ├── services/                API, sesión y lógica cliente
│   └── styles/                  Estilos responsivos
├── server/                      API Express
│   ├── config/                  Entorno, JWT y PostgreSQL
│   ├── controllers/             Controladores HTTP
│   ├── data/                    Persistencia
│   ├── middleware/              Auth, seguridad y errores
│   ├── routes/                  Endpoints REST
│   └── services/                Lógica de negocio
├── database/postgresql/         Esquema, seed y migraciones
├── docs/                        Informe y documentación
├── postman/                     Colección API
├── scripts/                     Migración y verificaciones
├── Dockerfile.backend
├── Dockerfile.frontend
└── docker-compose.yml
```

## Requisitos

- Node.js 22 o una versión LTS compatible.
- npm.
- Git.
- PostgreSQL, local o remoto, si se requiere persistencia.
- Docker Desktop con WSL 2 en Windows, solo para ejecución mediante contenedores.

## Instalación

```bash
git clone https://github.com/MarcosCadiz/ProyectoWebMovil.git
cd ProyectoWebMovil
npm install
```

Crear la configuración local:

```powershell
Copy-Item .env.example .env
```

En Linux o macOS:

```bash
cp .env.example .env
```

## Variables de entorno

```dotenv
API_PORT=4000
CORS_ORIGIN=http://127.0.0.1:5173
JWT_ISSUER=dom-santo-domingo-api
JWT_AUDIENCE=dom-santo-domingo-client
JWT_EXPIRES_IN=2h
DATABASE_URL=postgresql://USUARIO:CONTRASENA@HOST/NOMBRE_BASE?sslmode=require
DATABASE_SSL=true
```

Notas:

- `CORS_ORIGIN` admite varios orígenes separados por comas.
- Para PostgreSQL local puede usarse `DATABASE_SSL=false`.
- `.env` está excluido de Git y nunca debe contenerse en commits.
- Si PostgreSQL no está disponible, la API mantiene un fallback en memoria para desarrollo.

## Ejecución local

Iniciar frontend y API juntos:

```bash
npm run dev
```

Para ejecutarlos por separado, use `npm run dev:api` y `npm run dev:web` en terminales distintas.

Direcciones:

- Frontend: `http://127.0.0.1:5173`
- API: `http://127.0.0.1:4000/api`
- Healthcheck: `http://127.0.0.1:4000/api/health`

## Base de datos

Aplicar el esquema y verificar la conexión configurada en `.env`:

```bash
npm run db:migrate
npm run db:verify
```

El modelo incluye:

- `users`
- `tramites`
- `tramite_documentos`
- `tramite_resoluciones`
- `tramite_mensajes`
- `notifications`
- `audit_events`

## Docker

Validar la configuración:

```bash
docker compose config --quiet
```

Construir e iniciar:

```bash
docker compose up --build -d
docker compose ps
```

Servicios:

- Frontend: `http://localhost:8080`
- API: `http://localhost:4000/api/health`
- PostgreSQL: red interna de Compose.

Detener:

```bash
docker compose down
```

La sintaxis de Compose fue validada. La ejecución local en el equipo de entrega quedó bloqueada porque Docker Desktop no tenía disponible el daemon de WSL 2; la evidencia exacta está en [docs/evidencia-docker.md](./docs/evidencia-docker.md).

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el frontend |
| `npm run dev:api` | Inicia la API |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Sirve el build localmente |
| `npm run test:api` | Ejecuta el smoke test integral |
| `npm run db:migrate` | Aplica el esquema PostgreSQL |
| `npm run db:verify` | Verifica conexión y tablas principales |

## Flujos principales

Ciudadano:

```text
Registro/Login → Menú → Nueva solicitud → Adjuntos
→ Mis solicitudes → Detalle → Notificaciones/Resolución
```

Funcionario:

```text
Login → Bandeja DOM → Búsqueda/Filtro → Revisión
→ Checklist → Aprobación/Rechazo/Observación → Notificación
```

## API resumida

Públicos:

```text
GET  /api/health
GET  /api/jwks
GET  /api/.well-known/jwks.json
POST /api/auth/register
POST /api/auth/login
```

Protegidos:

```text
GET    /api/users/me
GET    /api/tramites
POST   /api/tramites
GET    /api/tramites/:id
PUT    /api/tramites/:id
PATCH  /api/tramites/:id
DELETE /api/tramites/:id
GET    /api/notifications
PATCH  /api/notifications/:id/read
PATCH  /api/notifications/read-all
```

Funcionario:

```text
GET  /api/users
POST /api/tramites/:id/decision
```

Contrato completo: [docs/api-endpoints.md](./docs/api-endpoints.md).

## Seguridad

- Contraseñas protegidas con bcrypt.
- JWT RS256 y publicación de JWKS.
- Autenticación y autorización por rol.
- Consultas PostgreSQL parametrizadas.
- CORS mediante lista blanca.
- Rate limit por dirección IP.
- Límite de body JSON de 1 MB.
- Validación de tamaños, tipos y campos.
- Rechazo explícito de patrones XSS.
- Cabeceras CSP, `nosniff`, `DENY` y políticas restrictivas.
- TLS verificable para PostgreSQL remoto.
- Respuestas de error sin stack traces ni datos sensibles.

## Verificación

```bash
npm run build
npm run test:api
npm run db:verify
docker compose config --quiet
```

El smoke test cubre JWT, roles, CRUD, documentos, resoluciones, notificaciones, paginación, bloqueo de XSS y errores controlados.

## Usuarios demo

| Rol | RUT | Contraseña |
|---|---|---|
| Ciudadano | `12.345.678-9` | `Usuario123` |
| Funcionario | `9.876.543-2` | `Funcionario123` |

Estas cuentas son exclusivamente de demostración.

## Documentación

- [Informe técnico completo](./docs/Informe_Proyecto_DOM_Santo_Domingo.md)
- [Endpoints de la API](./docs/api-endpoints.md)
- [Modelo relacional](./docs/modelo-relacional.md)
- [Matriz y evidencia EF1–EF6](./docs/evidencia-final-ef1-ef6.md)
- [Evidencia Docker](./docs/evidencia-docker.md)
- [Revisión de rúbrica anterior](./docs/revision-rubrica-entrega-parcial-2.md)
- [Colección Postman](./postman/DOM_Santo_Domingo_API.postman_collection.json)

## Limitaciones conocidas

- Los archivos adjuntos se representan como metadatos y contenido demostrativo; no existe almacenamiento binario productivo.
- El chat conserva comportamiento demostrativo y no constituye mensajería en tiempo real.
- El fallback en memoria no sustituye PostgreSQL en producción.
- No se ejecutó el runtime de Docker en el equipo de entrega por ausencia del daemon WSL 2.
- Antes de producción deben externalizarse las claves JWT, incorporar rotación, observabilidad y pruebas de carga.
