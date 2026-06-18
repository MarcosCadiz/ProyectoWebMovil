# Informe técnico — Plataforma DOM en Línea

## Control documental

| Campo | Valor |
|---|---|
| Proyecto | Plataforma DOM en Línea |
| Institución objetivo | Municipalidad de Santo Domingo |
| Unidad | Dirección de Obras Municipales |
| Asignatura | Ingeniería Web y Móvil — ICI4247-1 |
| Equipo | Milovan Fuentes, Amaro Fibla y Marcos Cadiz |
| Repositorio | <https://github.com/MarcosCadiz/ProyectoWebMovil> |
| Fecha de actualización | 18 de junio de 2026 |
| Estado | Implementación funcional y documentada |

## Índice

1. Resumen ejecutivo
2. Contexto y problema
3. Objetivos
4. Alcance funcional
5. Requerimientos
6. Arquitectura
7. Navegación y experiencia de usuario
8. Flujos funcionales
9. Modelo de datos
10. API REST
11. Seguridad
12. Rendimiento y optimización
13. Integraciones externas
14. Docker
15. Pruebas y evidencia
16. Matriz EF1–EF6
17. Instalación y ejecución
18. Usuarios demo
19. Riesgos y limitaciones
20. Recomendaciones
21. Conclusión

## 1. Resumen ejecutivo

La Plataforma DOM en Línea digitaliza el ingreso, seguimiento y revisión de solicitudes asociadas a la Dirección de Obras Municipales. La solución separa los flujos de ciudadanos y funcionarios, centraliza expedientes y documentos, protege el acceso con JWT y roles, persiste información en PostgreSQL y notifica al solicitante cuando se emite una resolución.

El proyecto está construido como una SPA React que consume una API REST Express. La API utiliza una arquitectura por capas, consultas parametrizadas y validaciones explícitas. PostgreSQL puede ejecutarse localmente, en un servicio administrado compatible —se verificó Neon— o dentro de Docker Compose. Para desarrollo existe un fallback temporal en memoria.

La entrega incorpora CRUD completo, resolución de expedientes, notificaciones, seguridad avanzada, optimización de consultas, accesibilidad básica, integración con OpenStreetMap, pruebas automatizadas y configuración Docker.

## 2. Contexto y problema

La gestión tradicional de expedientes DOM suele depender de documentos dispersos, revisión manual y comunicación fragmentada. Esto puede provocar:

- Demoras y reprocesos.
- Baja trazabilidad.
- Pérdida de contexto entre documentos y observaciones.
- Dificultad para conocer el estado actualizado.
- Comunicación tardía con el solicitante.
- Sobrecarga administrativa.

La propuesta centraliza la información de cada trámite y permite que ambos perfiles consulten una fuente común.

## 3. Objetivos

### 3.1 Objetivo general

Construir una plataforma web segura y mantenible para gestionar digitalmente solicitudes DOM desde su ingreso hasta su resolución.

### 3.2 Objetivos específicos

- Diferenciar ciudadanos y funcionarios mediante autenticación y roles.
- Permitir crear, consultar, editar y eliminar solicitudes.
- Asociar antecedentes y documentos al expediente.
- Facilitar la revisión mediante checklist normativo.
- Emitir decisiones de aprobación, rechazo u observación.
- Notificar al ciudadano y publicar la resolución.
- Mantener persistencia compartida en PostgreSQL.
- Aplicar controles de seguridad y validación.
- Entregar evidencia ejecutable y documentación reproducible.

## 4. Alcance funcional

### 4.1 Ciudadano

- Registro e inicio de sesión.
- Creación de solicitudes.
- Carga de antecedentes y metadatos de documentos.
- Consulta, edición y eliminación de solicitudes autorizadas.
- Seguimiento del estado.
- Lectura de notificaciones.
- Descarga del formulario y resolución demostrativa.
- Consulta contextual mediante el módulo de ayuda/chat.

### 4.2 Funcionario

- Inicio de sesión diferenciado.
- Bandeja con búsqueda y filtro de estado.
- Revisión de antecedentes y documentos.
- Checklist normativo.
- Redacción editable de resolución.
- Aprobación, rechazo u observación.
- Generación de folio y pasos posteriores.
- Notificación automática al solicitante.

### 4.3 Fuera del alcance productivo

- Firma electrónica avanzada real.
- Almacenamiento binario en object storage.
- Integración oficial con ClaveÚnica.
- Mensajería en tiempo real.
- Pagos municipales.

## 5. Requerimientos

### 5.1 Funcionales

| ID | Requerimiento | Estado |
|---|---|---|
| RF1 | Registrar e iniciar sesión | Implementado |
| RF2 | Separar acceso por rol | Implementado |
| RF3 | Crear y consultar trámites | Implementado |
| RF4 | Editar y eliminar trámites | Implementado |
| RF5 | Adjuntar antecedentes | Implementado como contenido demostrativo |
| RF6 | Revisar mediante checklist | Implementado |
| RF7 | Emitir una resolución | Implementado |
| RF8 | Notificar una decisión | Implementado |
| RF9 | Marcar notificaciones como leídas | Implementado |
| RF10 | Buscar, filtrar y paginar | Implementado |
| RF11 | Consultar mapa municipal | Implementado con OpenStreetMap |

### 5.2 No funcionales

| ID | Requerimiento | Implementación |
|---|---|---|
| RNF1 | Seguridad | JWT, bcrypt, roles, CORS, XSS, rate limit y SQL parametrizado |
| RNF2 | Rendimiento | Paginación, índices y consulta agregada sin N+1 |
| RNF3 | Disponibilidad de desarrollo | Fallback en memoria |
| RNF4 | Persistencia | PostgreSQL local/remoto |
| RNF5 | Usabilidad | Diseño responsivo, estados y feedback |
| RNF6 | Accesibilidad | Foco visible, etiquetas, ARIA y movimiento reducido |
| RNF7 | Despliegue | Dockerfiles y Compose |
| RNF8 | Mantenibilidad | Arquitectura por capas y documentación |

## 6. Arquitectura

```text
┌──────────────────────────────────────────────┐
│ Frontend React + Vite                        │
│ Rutas, componentes, módulos y servicios API │
└──────────────────────┬───────────────────────┘
                       │ HTTP/JSON + Bearer JWT
┌──────────────────────▼───────────────────────┐
│ API Node.js + Express                        │
│ Rutas → middleware → controladores → datos   │
└──────────────────────┬───────────────────────┘
                       │ SQL parametrizado
┌──────────────────────▼───────────────────────┐
│ PostgreSQL / Neon                            │
│ Usuarios, trámites, documentos, resoluciones │
│ notificaciones, mensajes y auditoría         │
└──────────────────────────────────────────────┘
```

### 6.1 Frontend

El frontend usa React Router para rutas públicas y privadas. Axios centraliza el consumo de `/api`; un interceptor incorpora el token guardado en `localStorage`.

Estructura principal:

```text
src/
├── components/
├── features/
├── pages/
├── routes/
├── services/
└── styles/
```

### 6.2 Backend

La API separa responsabilidades:

- `routes`: definición de endpoints.
- `middleware`: autenticación, roles, seguridad y errores.
- `controllers`: traducción HTTP.
- `services`: validación y lógica de negocio.
- `data`: PostgreSQL o fallback en memoria.
- `config`: entorno, base de datos y conexión TLS.

### 6.3 Decisiones técnicas

- React y Vite permiten una SPA modular con build optimizado.
- Express facilita una API REST pequeña y explícita.
- PostgreSQL aporta integridad referencial, JSONB e índices.
- JWT RS256 separa firma privada y verificación pública.
- El fallback en memoria evita bloquear desarrollo, pero no se considera persistencia productiva.

## 7. Navegación y experiencia de usuario

Rutas principales:

```text
/                              Inicio
/login-usuario                 Login ciudadano
/login-funcionario             Login funcionario
/registro                      Selección de registro
/registro-usuario              Registro ciudadano
/registro-funcionario          Registro funcionario
/menu-usuario                  Panel ciudadano
/menu-funcionario              Panel funcionario
/mis-solicitudes               Solicitudes
/mis-solicitudes/:id           Detalle y CRUD
/subir-archivos                Nueva solicitud
/notificaciones                Centro de notificaciones
/chat-audiencia                Ayuda contextual
/revision-solicitudes/:id      Revisión DOM
/resolucion-tramite/:id        Emisión de resolución
```

Mejoras UI/UX:

- Diseño responsivo.
- Estados de carga, error, vacío y confirmación.
- Tablas con desplazamiento horizontal controlado.
- Formularios etiquetados.
- Foco visible para navegación por teclado.
- Regiones `aria-live` para feedback.
- Respeto por `prefers-reduced-motion`.

## 8. Flujos funcionales

### 8.1 Ingreso de solicitud

```text
Ciudadano autenticado
→ completa antecedentes
→ adjunta documentos
→ genera formulario
→ POST /api/tramites
→ PostgreSQL
→ expediente visible para ciudadano y funcionario
```

### 8.2 Revisión y resolución

```text
Funcionario autenticado
→ filtra bandeja
→ abre expediente
→ revisa documentos y checklist
→ redacta decisión
→ POST /api/tramites/:id/decision
→ cambia estado
→ guarda resolución
→ crea notificación
→ ciudadano consulta y descarga
```

### 8.3 Autenticación

```text
RUT + contraseña
→ búsqueda de usuario
→ bcrypt.compare
→ JWT RS256
→ interceptor Axios
→ requireAuth
→ requireRole cuando corresponde
```

## 9. Modelo de datos

Entidades:

- `users`: ciudadanos y funcionarios.
- `tramites`: expediente principal.
- `tramite_documentos`: antecedentes del expediente.
- `tramite_resoluciones`: decisión formal y pasos posteriores.
- `tramite_mensajes`: conversación vinculada.
- `notifications`: avisos al usuario.
- `audit_events`: trazabilidad extensible.

Relaciones:

```text
users 1 ── N tramites (solicitante)
users 1 ── N tramites (funcionario)
tramites 1 ── N tramite_documentos
tramites 1 ── N tramite_resoluciones
tramites 1 ── N tramite_mensajes
tramites 1 ── N notifications
users 1 ── N notifications
```

Los índices cubren rol, solicitante, funcionario, estado, documentos, resoluciones, mensajes, notificaciones y auditoría.

Detalle completo: [modelo-relacional.md](./modelo-relacional.md).

## 10. API REST

### 10.1 Públicos

```text
GET  /api/health
GET  /api/jwks
GET  /api/.well-known/jwks.json
POST /api/auth/register
POST /api/auth/login
```

### 10.2 Usuarios

```text
GET /api/users/me
GET /api/users          Solo funcionario
```

### 10.3 Trámites

```text
GET    /api/tramites
POST   /api/tramites
GET    /api/tramites/:id
PUT    /api/tramites/:id
PATCH  /api/tramites/:id
DELETE /api/tramites/:id
POST   /api/tramites/:id/decision   Solo funcionario
```

El listado admite `limit`, `offset`, `status` y `search`.

### 10.4 Notificaciones

```text
GET   /api/notifications
PATCH /api/notifications/:id/read
PATCH /api/notifications/read-all
```

Contrato completo: [api-endpoints.md](./api-endpoints.md).

## 11. Seguridad

### 11.1 Identidad y acceso

- bcrypt para hashing.
- Contraseñas de 8 a 72 caracteres.
- JWT RS256 con issuer, audience y expiración.
- JWKS para publicar la clave de verificación.
- Middleware `requireAuth`.
- Middleware `requireRole`.
- Filtrado de expedientes por propietario para ciudadanos.

### 11.2 Entrada y API

- JSON limitado a 1 MB.
- Longitudes máximas por campo.
- Máximo de 20 documentos por solicitud.
- Rechazo de scripts, iframes, esquemas `javascript:` y handlers HTML.
- Rate limit de 120 solicitudes por minuto e IP.
- CORS por lista blanca.
- Errores normalizados sin información interna.

### 11.3 Cabeceras

- `Content-Security-Policy`.
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY`.
- `Referrer-Policy: no-referrer`.
- `Permissions-Policy` restrictiva.
- `Cross-Origin-Resource-Policy`.

### 11.4 Base de datos

- Consultas parametrizadas con `$1`, `$2`, etc.
- Restricciones `UNIQUE`, claves foráneas y `CHECK`.
- TLS con verificación de certificado para conexión remota.
- Credenciales únicamente en `.env`.

## 12. Rendimiento y optimización

El listado de trámites usa una consulta agregada que obtiene documentos y última resolución mediante subconsultas JSONB. Esto elimina el patrón N+1.

También se implementó:

- `LIMIT` máximo de 100.
- `OFFSET` no negativo.
- Filtros parametrizados por estado y búsqueda.
- Índices sobre columnas de relación y consulta.
- Build Vite minificado.
- Respuestas acotadas de notificaciones.

## 13. Integraciones externas

### 13.1 OpenStreetMap

El panel ciudadano incorpora un mapa embebido de la comuna mediante OpenStreetMap. No requiere credenciales privadas y aporta contexto territorial.

### 13.2 PostgreSQL administrado

La aplicación es compatible con servicios PostgreSQL administrados. Se verificó una instancia Neon con TLS y las tablas:

```text
users
tramites
tramite_documentos
tramite_resoluciones
```

## 14. Docker

Archivos:

```text
Dockerfile.backend
Dockerfile.frontend
docker-compose.yml
docker/nginx.conf
.dockerignore
```

Compose define:

- PostgreSQL 16 Alpine con volumen y healthcheck.
- API Node.js con dependencia saludable de PostgreSQL.
- Frontend compilado con Vite y servido por Nginx.
- Proxy `/api` de Nginx hacia el backend.

Validación realizada:

```text
docker compose config --quiet → OK
Servicios: database, backend, frontend
```

La ejecución de contenedores no pudo completarse en el equipo de entrega porque el daemon de Docker Desktop no estaba disponible y Windows indicó ausencia de WSL 2. Este hecho está documentado sin presentar la prueba como exitosa.

## 15. Pruebas y evidencia

### 15.1 Build

```bash
npm run build
```

Resultado: build de producción generado correctamente.

### 15.2 Smoke test API

```bash
npm run test:api
```

Cobertura:

- Healthcheck.
- Login ciudadano y funcionario.
- JWT y roles.
- Perfil y listado de usuarios.
- Paginación.
- Creación con documento.
- Lectura y actualización.
- Emisión de resolución.
- Notificación al ciudadano.
- Marcado de notificaciones.
- Rechazo de XSS.
- Eliminación.
- Error controlado por body incompleto.

### 15.3 Base remota

```bash
npm run db:verify
```

Resultado verificado:

```json
{
  "ok": true,
  "database": "neondb",
  "tables": [
    "tramite_documentos",
    "tramite_resoluciones",
    "tramites",
    "users"
  ]
}
```

### 15.4 Docker

```bash
docker compose config --quiet
```

Resultado: sintaxis y resolución correctas. Runtime bloqueado por el entorno descrito en la sección 14.

## 16. Matriz de criterios EF1–EF6

| Criterio | Evidencia | Estado |
|---|---|---|
| EF1 Funcionalidades | CRUD, documentos, resoluciones y notificaciones | Cumplido |
| EF2 UI/UX y rendimiento | Responsividad, accesibilidad, estados y paginación | Cumplido |
| EF3 Seguridad avanzada | SQL parametrizado, XSS, CORS, bcrypt y JWT | Cumplido |
| EF4 Optimización | Consulta agregada, filtros, límites e índices | Cumplido |
| EF5 Servicio externo | OpenStreetMap y PostgreSQL Neon | Cumplido |
| EF6 Docker | Dockerfiles, Compose y validación estática | Parcial: runtime no ejecutado por WSL |

## 17. Instalación y ejecución

```bash
git clone https://github.com/MarcosCadiz/ProyectoWebMovil.git
cd ProyectoWebMovil
npm install
```

Crear `.env` desde `.env.example`, configurar PostgreSQL y ejecutar:

```bash
npm run db:migrate
npm run dev:api
npm run dev
```

Para una guía operacional más breve, consultar el [README principal](../README.md).

## 18. Usuarios demo

```text
Ciudadano
RUT: 12.345.678-9
Contraseña: Usuario123

Funcionario
RUT: 9.876.543-2
Contraseña: Funcionario123
```

## 19. Riesgos y limitaciones

- Los adjuntos no se almacenan como archivos binarios reales.
- El chat es demostrativo.
- El fallback en memoria pierde datos al reiniciar.
- No existe rotación de claves ni refresh token.
- No se han ejecutado pruebas de carga o pentesting externo.
- El runtime Docker requiere habilitar WSL 2 en el equipo evaluado.

## 20. Recomendaciones de evolución

- Incorporar object storage con antivirus y URLs firmadas.
- Gestionar claves JWT mediante un secret manager.
- Implementar refresh token y revocación.
- Agregar auditoría efectiva a las operaciones críticas.
- Añadir pruebas unitarias, integración y end-to-end.
- Incorporar observabilidad, logs estructurados y métricas.
- Ejecutar pruebas de carga y análisis de seguridad.
- Completar integración real de ClaveÚnica y firma electrónica.

## 21. Conclusión

La plataforma demuestra una integración completa entre frontend, backend y PostgreSQL para el ciclo principal de un expediente DOM. El proyecto supera una maqueta estática: implementa autenticación, autorización, CRUD, revisión, resolución, notificaciones, seguridad y verificaciones reproducibles.

La documentación distingue con transparencia entre funciones plenamente ejecutadas y elementos que aún requieren infraestructura productiva. Esto permite evaluar el sistema sobre evidencia concreta y ofrece una base mantenible para continuar su evolución.
