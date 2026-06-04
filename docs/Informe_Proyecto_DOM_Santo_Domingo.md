# Informe Técnico - Plataforma DOM en Línea

## 1. Identificación del Proyecto

**Nombre:** Plataforma DOM en Línea
**Institución objetivo:** Municipalidad de Santo Domingo
**Área:** Dirección de Obras Municipales (DOM)
**Asignatura:** Ingeniería Web y Móvil (ICI4247-1)
**Repositorio:** https://github.com/MarcosCadiz/ProyectoWebMovil.git

## 2. Integrantes

- Milovan Fuentes
- Amaro Fibla
- Marcos Cadiz

## 3. Propósito del Proyecto

La plataforma busca digitalizar y ordenar el proceso de gestión de trámites de la Dirección de Obras Municipales. El objetivo es disminuir la dependencia de revisiones manuales, mejorar la trazabilidad de solicitudes y facilitar la comunicación entre usuarios ciudadanos y funcionarios municipales.

La solución contempla pantallas para login diferenciado, registro de usuarios, bandeja de usuario, bandeja de funcionario, seguimiento de solicitudes, notificaciones, carga de documentos, mensajería y revisión normativa.

## 4. Problema Detectado

Las Direcciones de Obras Municipales suelen revisar documentos, formularios, planos y normativas de forma manual. Esto genera:

- Demoras en la revisión.
- Posibilidad de errores humanos.
- Baja trazabilidad.
- Dificultad para informar oportunamente al usuario.
- Sobrecarga administrativa para funcionarios.
- Gestión documental dispersa.

## 5. Usuarios Objetivos

### Usuario ciudadano o solicitante

Incluye vecinos, propietarios de la comuna de Santo Domingo, profesionales externos, arquitectos patrocinantes, constructores y representantes de empresas que necesitan ingresar trámites, consultar estados, responder observaciones o adjuntar documentación.

### Funcionario DOM

Incluye personal administrativo y profesionales técnicos de la Municipalidad de Santo Domingo, como arquitectos revisores e ingenieros, encargados de evaluar documentos, normativas y solicitudes ingresadas.

## 6. Solución Propuesta

El sistema propone una plataforma web que centraliza:

- Inicio de sesión de usuarios ciudadanos y funcionarios.
- Registro diferenciado por tipo de usuario.
- Seguimiento de solicitudes.
- Carga y reemplazo de documentos.
- Notificaciones de cambios de estado.
- Mensajería entre usuario y funcionario.
- Bandeja de entrada para funcionarios.
- Revisión normativa con checklist.
- Acciones de aprobar, rechazar u observar trámites.

## 7. Requerimientos del Sistema

### 7.1 Requerimientos Funcionales

- **RF1: Creación de solicitudes de trámites.** El usuario ciudadano puede iniciar un nuevo trámite completando un formulario digital y adjuntando documentos.
- **RF2: Bandeja de entrada y filtrado.** El funcionario DOM puede visualizar solicitudes y filtrarlas por tipo, fecha y estado.
- **RF3: Evaluación mediante checklist normativo.** El funcionario puede revisar una solicitud y completar validaciones normativas.
- **RF4: Emisión de observaciones y cambio de estado.** El funcionario puede aprobar, rechazar u observar un trámite.
- **RF5: Actualización y reemplazo de documentos.** El usuario puede subir documentos corregidos cuando el trámite está observado.
- **RF6: Historial de mensajería integrada.** Usuario y funcionario pueden mantener comunicación asociada a una solicitud.
- **RF7: Generación automática de notificaciones.** El sistema informa cambios relevantes dentro de la plataforma.
- **RF8: Descarga de certificados.** Una vez aprobado el trámite, el usuario podrá descargar certificados o resoluciones.

### 7.2 Requerimientos No Funcionales

- **RNF1: Seguridad e integridad.** Las rutas operativas usan JWT firmado con RS256 y las contraseñas se almacenan con bcrypt.
- **RNF2: Rendimiento.** Las bandejas deben responder de forma fluida bajo carga esperada de usuarios.
- **RNF3: Usabilidad y diseño responsivo.** La interfaz debe ser clara para usuarios ciudadanos y funcionarios.
- **RNF4: Persistencia.** Los usuarios creados deben guardarse en PostgreSQL cuando la variable `DATABASE_URL` está configurada.

## 8. Diseños y Prototipos Figma

El diseño visual, UX y UI de la plataforma fue modelado mediante mockups en Figma.

Prototipo:

```txt
https://www.figma.com/design/Tu8OXGM1aUeQLkPWjovQMP/Proyecto-Web-y-Movil-Santo-Domingo?node-id=0-1&t=jP7KKE41ISASxBfh-1
```

### Formularios de sesión y registro

El flujo contempla dos tipos de registro:

**Usuario ciudadano**

- Nombre de usuario.
- RUT.
- Correo electrónico.
- Contraseña.

**Funcionario DOM**

- Nombre de funcionario.
- RUT del funcionario.
- Correo institucional.
- Contraseña.
- Cargo o unidad del funcionario.

## 9. Arquitectura General

```txt
Frontend React/Vite
    ↓
Backend Node.js/Express
    ↓
Base de Datos PostgreSQL
```

El proyecto está separado en capas para mantener claridad y escalabilidad.

## 10. Frontend

El frontend está construido con React y Vite. Su objetivo es representar las pantallas del prototipo de Figma y permitir la navegación entre flujos.

Estructura relevante:

```txt
src/
├── components/
├── data/
├── features/
├── pages/
├── routes/
├── services/
└── styles/
```

### Flujo Frontend

```txt
Inicio
├── Login Usuario
│   ├── Registro de usuario
│   └── Menú Usuario
│       ├── Mis Solicitudes
│       ├── Notificaciones
│       ├── Subir Archivos
│       └── Chat / Mensajería
└── Login Funcionario
    ├── Registro de funcionario
    └── Menú Funcionario
        └── Revisión de Solicitud
```

### Decisiones de navegación

- Las rutas principales corresponden a inicio, login, registro y paneles de usuario/funcionario.
- Las rutas secundarias cubren solicitudes, notificaciones, carga de documentos, chat y revisión de solicitudes.
- El modelo SPA con React Router permite navegar sin recargar la página completa.
- Las rutas privadas están protegidas por token JWT y rol.

## 11. Consumo de API e Interceptores (EP 2.4)

El frontend consume la API mediante **Axios**. La configuración principal está en:

```txt
src/services/apiClient.js
src/services/authApi.js
src/services/authSession.js
```

### Cliente Axios

El archivo `apiClient.js` crea un cliente con base URL:

```txt
/api
```

Gracias al proxy de Vite, las llamadas del frontend se redirigen al backend:

```txt
http://127.0.0.1:4000/api
```

### Interceptor de token JWT

Se implementó un interceptor de request en Axios. Antes de enviar cada petición, el interceptor revisa si existe un token en `localStorage`:

```txt
dom_access_token
```

Si el token existe, se agrega automáticamente al header:

```txt
Authorization: Bearer <token>
```

Esto permite que las rutas protegidas del backend reciban el JWT sin repetir manualmente la lógica en cada componente.

### Servicios de autenticación

`authApi.js` expone funciones para:

- `login(credentials)`: llama a `POST /api/auth/login`.
- `register(profile)`: llama a `POST /api/auth/register`.
- `saveSession(session)`: guarda usuario y JWT en navegador.
- `clearSession()`: elimina sesión al cerrar sesión.

### Validación de roles desde frontend

El login de usuario solo permite entrar si el backend retorna `role: "usuario"`.
El login de funcionario solo permite entrar si el backend retorna `role: "funcionario"`.

Si se ingresan credenciales válidas pero en el acceso incorrecto, se muestra una advertencia y no se guarda el token.

Ejemplo:

```txt
Estas credenciales pertenecen a un usuario. Ingresa desde el acceso usuario.
```

## 12. Backend

El backend está construido con Node.js y Express. Entrega rutas API, autenticación, hashing de contraseñas, emisión de tokens JWT y conexión a PostgreSQL.

Estructura relevante:

```txt
server/
├── app.js
├── index.js
├── config/
├── controllers/
├── data/
├── middleware/
├── routes/
└── services/
```

### Flujo Backend

```txt
Request HTTP
    ↓
Ruta Express
    ↓
Controlador
    ↓
Servicio
    ↓
Capa de datos
    ↓
PostgreSQL o memoria temporal
    ↓
Respuesta JSON
```

### Justificación técnica

La implementación usa una estructura por capas:

- **Rutas:** definen los puntos de entrada HTTP.
- **Controladores:** administran request y response.
- **Servicios:** contienen la lógica de negocio.
- **Capa de datos:** interactúa con PostgreSQL o con memoria temporal si la base no está disponible.

Esta separación favorece mantenibilidad, testeo y escalabilidad.

## 13. Modelo Relacional y Base de Datos PostgreSQL

La persistencia principal está pensada para PostgreSQL. La conexión se configura mediante:

```txt
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/dom_santo_domingo
```

Archivos relevantes:

```txt
database/postgresql/schema.sql
database/postgresql/seed.sql
database/postgresql/migrations/001_user_profile_fields.sql
server/config/database.js
server/services/databaseService.js
```

### Comportamiento actual

- Si `DATABASE_URL` está configurado y PostgreSQL está disponible, los usuarios se guardan persistentemente en la tabla `users`.
- Si PostgreSQL no está disponible, el backend no se cae; usa memoria como respaldo temporal para desarrollo.
- Al iniciar el servidor, se asegura la existencia de la tabla `users` y columnas necesarias.

### Diagrama Entidad-Relación Simplificado

```txt
users 1 ---- N tramites
users 1 ---- N tramite_mensajes
tramites 1 ---- N tramite_documentos
tramites 1 ---- N tramite_mensajes
tramites 1 ---- N notifications
tramites 1 ---- N audit_events
users 1 ---- N notifications
```

### Tablas principales

- **users:** Guarda usuarios ciudadanos y funcionarios. Contiene `id`, `name`, `rut`, `email`, `department`, `password_hash` y `role`.
- **tramites:** Representa una solicitud DOM.
- **tramite_documentos:** Guarda archivos asociados al trámite.
- **tramite_mensajes:** Guarda la conversación entre usuario y funcionario.
- **notifications:** Guarda avisos dirigidos a usuarios.
- **audit_events:** Guarda trazabilidad técnica y funcional.

## 14. Autenticación

El backend permite registrar e iniciar sesión con RUT y contraseña.

### Hash de contraseñas

Las contraseñas no se almacenan directamente. Se procesan con bcrypt:

```txt
Contraseña original
    ↓
bcrypt
    ↓
Hash seguro
```

### Login y token

Cuando el usuario inicia sesión correctamente:

```txt
1. Se busca el usuario por RUT.
2. Se compara la contraseña con bcrypt.
3. Si coincide, se genera un JWT.
4. El frontend guarda el token.
5. El token se usa para acceder a rutas protegidas.
```

### JWT y JWK

El sistema genera un JWT firmado con RS256. La clave pública se expone como JWK/JWKS:

```txt
GET /api/jwks
GET /api/.well-known/jwks.json
```

## 15. Seguridad e Inyección SQL (EP 2.6)

El sistema implementa:

- Hash de contraseñas con bcrypt.
- JWT firmado con RS256.
- JWK/JWKS para verificación pública.
- Middleware de autenticación.
- Control básico por rol.
- Limpieza de sesión al cerrar sesión.
- Validación de rol en frontend antes de guardar JWT.

### Protección contra inyección SQL

La conexión a PostgreSQL utiliza consultas parametrizadas mediante el cliente `pg`.

Ejemplo conceptual:

```txt
SELECT ... FROM users WHERE rut = $1
```

Los valores ingresados por el usuario se envían como parámetros separados del texto SQL. Esto evita concatenar directamente datos del formulario dentro de la consulta y reduce el riesgo de inyección SQL.

También se usa:

- Restricción `UNIQUE` para `rut`.
- Manejo del error PostgreSQL `23505` para detectar usuarios duplicados.
- Validación de roles permitidos: `usuario` y `funcionario`.

## 16. Rutas API

### Públicas

```txt
GET  /api/health
GET  /api/jwks
GET  /api/.well-known/jwks.json
POST /api/auth/register
POST /api/auth/login
```

### Protegidas

Requieren:

```txt
Authorization: Bearer <accessToken>
```

```txt
GET  /api/users/me
GET  /api/tramites
POST /api/tramites
```

### Protegida por rol funcionario

```txt
GET /api/users
```

## 17. Pruebas de API con Postman / Insomnia (EP 2.7)

El proyecto incluye una colección Postman para verificar el funcionamiento del backend.

Archivo:

```txt
postman/DOM_Santo_Domingo_API.postman_collection.json
```

La colección valida:

- `GET /api/health`
- `GET /api/jwks`
- `POST /api/auth/login` para usuario ciudadano.
- `POST /api/auth/login` para funcionario DOM.
- `POST /api/auth/register`
- `GET /api/users/me`
- `GET /api/users` con rol funcionario.
- `GET /api/tramites`
- `POST /api/tramites`
- Casos negativos: token faltante, credenciales inválidas y trámite sin tipo.

### Evidencia de ejecución

Se ejecutaron verificaciones locales desde terminal para respaldar el cumplimiento:

```bash
npm run build
```

Resultado:

```txt
✓ built
```

También se ejecutó una prueba de API que verificó:

```txt
health
login usuario
login funcionario
users/me
users
crear tramite
error controlado TRAMITE_TYPE_REQUIRED
```

Resultado:

```txt
api-evidence-ok: health, login usuario, login funcionario, users/me, users, crear tramite, error controlado
```

Validación de colección Postman:

```txt
postman-collection-json-ok
```

### Cómo ejecutar la colección

1. Levantar backend:

```bash
npm run dev:api
```

2. Importar en Postman o Insomnia:

```txt
postman/DOM_Santo_Domingo_API.postman_collection.json
```

3. Ejecutar los requests en orden. La colección guarda tokens de usuario y funcionario para probar rutas protegidas.

## 18. Usuarios Demo

```txt
Usuario ciudadano:
RUT: 12.345.678-9
Password: Usuario123

Funcionario DOM:
RUT: 9.876.543-2
Password: Funcionario123
```

## 19. Flujos Funcionales

### Usuario Ciudadano

```txt
1. Ingresa a la plataforma.
2. Selecciona "Usuario".
3. Inicia sesión.
4. Revisa el menú principal.
5. Consulta solicitudes.
6. Revisa notificaciones.
7. Sube documentos.
8. Revisa mensajes y observaciones.
```

### Funcionario DOM

```txt
1. Ingresa a la plataforma.
2. Selecciona "Funcionario".
3. Inicia sesión.
4. Revisa la bandeja de entrada.
5. Selecciona una solicitud.
6. Revisa antecedentes y documentos.
7. Completa checklist normativo.
8. Observa, rechaza o aprueba.
```

### Registro

```txt
1. Usuario o funcionario presiona "Registrarse".
2. Selecciona tipo de cuenta.
3. Completa formulario.
4. El backend guarda usuario con hash de contraseña.
5. El sistema vuelve al login correspondiente.
```

### Cierre de sesión

```txt
1. Usuario o funcionario presiona "Cerrar Sesion".
2. El frontend elimina token y usuario del localStorage.
3. El sistema vuelve a la pantalla inicial.
```

## 20. Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/MarcosCadiz/ProyectoWebMovil.git
cd ProyectoWebMovil
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env`:

```bash
copy .env.example .env
```

En Linux/macOS:

```bash
cp .env.example .env
```

4. Configurar PostgreSQL si se desea persistencia:

```txt
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/dom_santo_domingo
```

## 21. Ejecución

Levantar frontend:

```bash
npm run dev
```

URL:

```txt
http://127.0.0.1:5173
```

Levantar backend:

```bash
npm run dev:api
```

URL:

```txt
http://127.0.0.1:4000/api
```

Compilar frontend:

```bash
npm run build
```

## 22. Consideraciones

- El sistema ya contempla PostgreSQL para persistencia de usuarios.
- Si PostgreSQL no está disponible, el backend usa memoria temporal para que el sistema no se caiga en desarrollo.
- Varias pantallas de trámites, notificaciones y mensajería aún usan datos de mockup.
- El login, registro, cierre de sesión y protección de rutas ya están conectados al backend.
- Para producción se recomienda persistir también trámites, documentos, mensajes y notificaciones en PostgreSQL.

## 23. Próximos Pasos

- Conectar trámites, documentos, mensajes y notificaciones a PostgreSQL.
- Agregar carga real de archivos.
- Implementar refresh tokens.
- Agregar pruebas automatizadas con Jest, Vitest o Supertest.
- Agregar validación avanzada de formularios.
- Mejorar permisos granulares por rol.
- Agregar almacenamiento seguro para documentos PDF.
