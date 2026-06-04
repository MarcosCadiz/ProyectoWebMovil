# Informe TÃ©cnico - Plataforma DOM en LÃ­nea

## 1. IdentificaciÃ³n del Proyecto

**Nombre:** Plataforma DOM en LÃ­nea
**InstituciÃ³n objetivo:** Municipalidad de Santo Domingo
**Ãrea:** DirecciÃ³n de Obras Municipales (DOM)
**Asignatura:** IngenierÃ­a Web y MÃ³vil (ICI4247-1)
**Repositorio:** https://github.com/MarcosCadiz/ProyectoWebMovil.git

## 2. Integrantes

- Milovan Fuentes
- Amaro Fibla
- Marcos Cadiz

## 3. PropÃ³sito del Proyecto

La plataforma busca digitalizar y ordenar el proceso de gestiÃ³n de trÃ¡mites de la DirecciÃ³n de Obras Municipales. El objetivo es disminuir la dependencia de revisiones manuales, mejorar la trazabilidad de solicitudes y facilitar la comunicaciÃ³n entre usuarios ciudadanos y funcionarios municipales.

La soluciÃ³n contempla pantallas para login diferenciado, registro de usuarios, bandeja de usuario, bandeja de funcionario, seguimiento de solicitudes, notificaciones, carga de documentos, mensajerÃ­a y revisiÃ³n normativa.

## 4. Problema Detectado

Las Direcciones de Obras Municipales suelen revisar documentos, formularios, planos y normativas de forma manual. Esto genera:

- Demoras en la revisiÃ³n.
- Posibilidad de errores humanos.
- Baja trazabilidad.
- Dificultad para informar oportunamente al usuario.
- Sobrecarga administrativa para funcionarios.
- GestiÃ³n documental dispersa.

## 5. Usuarios Objetivos

### Usuario ciudadano o solicitante

Incluye vecinos, propietarios de la comuna de Santo Domingo, profesionales externos, arquitectos patrocinantes, constructores y representantes de empresas que necesitan ingresar trÃ¡mites, consultar estados, responder observaciones o adjuntar documentaciÃ³n.

### Funcionario DOM

Incluye personal administrativo y profesionales tÃ©cnicos de la Municipalidad de Santo Domingo, como arquitectos revisores e ingenieros, encargados de evaluar documentos, normativas y solicitudes ingresadas.

## 6. SoluciÃ³n Propuesta

El sistema propone una plataforma web que centraliza:

- Inicio de sesiÃ³n de usuarios ciudadanos y funcionarios.
- Registro diferenciado por tipo de usuario.
- Seguimiento de solicitudes.
- Carga y reemplazo de documentos.
- Notificaciones de cambios de estado.
- MensajerÃ­a entre usuario y funcionario.
- Bandeja de entrada para funcionarios.
- RevisiÃ³n normativa con checklist.
- Acciones de aprobar, rechazar u observar trÃ¡mites.

## 7. Requerimientos del Sistema

### 7.1 Requerimientos Funcionales

- **RF1: CreaciÃ³n de solicitudes de trÃ¡mites.** El usuario ciudadano puede iniciar un nuevo trÃ¡mite completando un formulario digital y adjuntando documentos.
- **RF2: Bandeja de entrada y filtrado.** El funcionario DOM puede visualizar solicitudes y filtrarlas por tipo, fecha y estado.
- **RF3: EvaluaciÃ³n mediante checklist normativo.** El funcionario puede revisar una solicitud y completar validaciones normativas.
- **RF4: EmisiÃ³n de observaciones y cambio de estado.** El funcionario puede aprobar, rechazar u observar un trÃ¡mite.
- **RF5: ActualizaciÃ³n y reemplazo de documentos.** El usuario puede subir documentos corregidos cuando el trÃ¡mite estÃ¡ observado.
- **RF6: Historial de mensajerÃ­a integrada.** Usuario y funcionario pueden mantener comunicaciÃ³n asociada a una solicitud.
- **RF7: GeneraciÃ³n automÃ¡tica de notificaciones.** El sistema informa cambios relevantes dentro de la plataforma.
- **RF8: Descarga de certificados.** Una vez aprobado el trÃ¡mite, el usuario podrÃ¡ descargar certificados o resoluciones.

### 7.2 Requerimientos No Funcionales

- **RNF1: Seguridad e integridad.** Las rutas operativas usan JWT firmado con RS256 y las contraseÃ±as se almacenan con bcrypt.
- **RNF2: Rendimiento.** Las bandejas deben responder de forma fluida bajo carga esperada de usuarios.
- **RNF3: Usabilidad y diseÃ±o responsivo.** La interfaz debe ser clara para usuarios ciudadanos y funcionarios.
- **RNF4: Persistencia.** Los usuarios creados deben guardarse en PostgreSQL cuando la variable `DATABASE_URL` estÃ¡ configurada.

## 8. DiseÃ±os y Prototipos Figma

El diseÃ±o visual, UX y UI de la plataforma fue modelado mediante mockups en Figma.

Prototipo:

```txt
https://www.figma.com/design/Tu8OXGM1aUeQLkPWjovQMP/Proyecto-Web-y-Movil-Santo-Domingo?node-id=0-1&t=jP7KKE41ISASxBfh-1
```

### Formularios de sesiÃ³n y registro

El flujo contempla dos tipos de registro:

**Usuario ciudadano**

- Nombre de usuario.
- RUT.
- Correo electrÃ³nico.
- ContraseÃ±a.

**Funcionario DOM**

- Nombre de funcionario.
- RUT del funcionario.
- Correo institucional.
- ContraseÃ±a.
- Cargo o unidad del funcionario.

## 9. Arquitectura General

```txt
Frontend React/Vite
    â†“
Backend Node.js/Express
    â†“
Base de Datos PostgreSQL
```

El proyecto estÃ¡ separado en capas para mantener claridad y escalabilidad.

## 10. Frontend

El frontend estÃ¡ construido con React y Vite. Su objetivo es representar las pantallas del prototipo de Figma y permitir la navegaciÃ³n entre flujos.

Estructura relevante:

```txt
src/
â”œâ”€â”€ components/
â”œâ”€â”€ data/
â”œâ”€â”€ features/
â”œâ”€â”€ pages/
â”œâ”€â”€ routes/
â”œâ”€â”€ services/
â””â”€â”€ styles/
```

### Flujo Frontend

```txt
Inicio
â”œâ”€â”€ Login Usuario
â”‚   â”œâ”€â”€ Registro de usuario
â”‚   â””â”€â”€ MenÃº Usuario
â”‚       â”œâ”€â”€ Mis Solicitudes
â”‚       â”œâ”€â”€ Notificaciones
â”‚       â”œâ”€â”€ Subir Archivos
â”‚       â””â”€â”€ Chat / MensajerÃ­a
â””â”€â”€ Login Funcionario
    â”œâ”€â”€ Registro de funcionario
    â””â”€â”€ MenÃº Funcionario
        â””â”€â”€ RevisiÃ³n de Solicitud
```

### Decisiones de navegaciÃ³n

- Las rutas principales corresponden a inicio, login, registro y paneles de usuario/funcionario.
- Las rutas secundarias cubren solicitudes, notificaciones, carga de documentos, chat y revisiÃ³n de solicitudes.
- El modelo SPA con React Router permite navegar sin recargar la pÃ¡gina completa.
- Las rutas privadas estÃ¡n protegidas por token JWT y rol.

## 11. Consumo de API e Interceptores (EP 2.4)

El frontend consume la API mediante **Axios**. La configuraciÃ³n principal estÃ¡ en:

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

Se implementÃ³ un interceptor de request en Axios. Antes de enviar cada peticiÃ³n, el interceptor revisa si existe un token en `localStorage`:

```txt
dom_access_token
```

Si el token existe, se agrega automÃ¡ticamente al header:

```txt
Authorization: Bearer <token>
```

Esto permite que las rutas protegidas del backend reciban el JWT sin repetir manualmente la lÃ³gica en cada componente.

### Servicios de autenticaciÃ³n

`authApi.js` expone funciones para:

- `login(credentials)`: llama a `POST /api/auth/login`.
- `register(profile)`: llama a `POST /api/auth/register`.
- `saveSession(session)`: guarda usuario y JWT en navegador.
- `clearSession()`: elimina sesiÃ³n al cerrar sesiÃ³n.

### ValidaciÃ³n de roles desde frontend

El login de usuario solo permite entrar si el backend retorna `role: "usuario"`.
El login de funcionario solo permite entrar si el backend retorna `role: "funcionario"`.

Si se ingresan credenciales vÃ¡lidas pero en el acceso incorrecto, se muestra una advertencia y no se guarda el token.

Ejemplo:

```txt
Estas credenciales pertenecen a un usuario. Ingresa desde el acceso usuario.
```

## 12. Backend

El backend estÃ¡ construido con Node.js y Express. Entrega rutas API, autenticaciÃ³n, hashing de contraseÃ±as, emisiÃ³n de tokens JWT y conexiÃ³n a PostgreSQL.

Estructura relevante:

```txt
server/
â”œâ”€â”€ app.js
â”œâ”€â”€ index.js
â”œâ”€â”€ config/
â”œâ”€â”€ controllers/
â”œâ”€â”€ data/
â”œâ”€â”€ middleware/
â”œâ”€â”€ routes/
â””â”€â”€ services/
```

### Flujo Backend

```txt
Request HTTP
    â†“
Ruta Express
    â†“
Controlador
    â†“
Servicio
    â†“
Capa de datos
    â†“
PostgreSQL o memoria temporal
    â†“
Respuesta JSON
```

### JustificaciÃ³n tÃ©cnica

La implementaciÃ³n usa una estructura por capas:

- **Rutas:** definen los puntos de entrada HTTP.
- **Controladores:** administran request y response.
- **Servicios:** contienen la lÃ³gica de negocio.
- **Capa de datos:** interactÃºa con PostgreSQL o con memoria temporal si la base no estÃ¡ disponible.

Esta separaciÃ³n favorece mantenibilidad, testeo y escalabilidad.

## 13. Modelo Relacional y Base de Datos PostgreSQL

La persistencia principal estÃ¡ pensada para PostgreSQL. La conexiÃ³n se configura mediante:

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

- Si `DATABASE_URL` estÃ¡ configurado y PostgreSQL estÃ¡ disponible, los usuarios se guardan persistentemente en la tabla `users`.
- Si PostgreSQL no estÃ¡ disponible, el backend no se cae; usa memoria como respaldo temporal para desarrollo.
- Al iniciar el servidor, se asegura la existencia de la tabla `users` y columnas necesarias.

### Diagrama Entidad-RelaciÃ³n Simplificado

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
- **tramite_documentos:** Guarda archivos asociados al trÃ¡mite.
- **tramite_mensajes:** Guarda la conversaciÃ³n entre usuario y funcionario.
- **notifications:** Guarda avisos dirigidos a usuarios.
- **audit_events:** Guarda trazabilidad tÃ©cnica y funcional.

## 14. AutenticaciÃ³n

El backend permite registrar e iniciar sesiÃ³n con RUT y contraseÃ±a.

### Hash de contraseÃ±as

Las contraseÃ±as no se almacenan directamente. Se procesan con bcrypt:

```txt
ContraseÃ±a original
    â†“
bcrypt
    â†“
Hash seguro
```

### Login y token

Cuando el usuario inicia sesiÃ³n correctamente:

```txt
1. Se busca el usuario por RUT.
2. Se compara la contraseÃ±a con bcrypt.
3. Si coincide, se genera un JWT.
4. El frontend guarda el token.
5. El token se usa para acceder a rutas protegidas.
```

### JWT y JWK

El sistema genera un JWT firmado con RS256. La clave pÃºblica se expone como JWK/JWKS:

```txt
GET /api/jwks
GET /api/.well-known/jwks.json
```

## 15. Seguridad e InyecciÃ³n SQL (EP 2.6)

El sistema implementa:

- Hash de contraseÃ±as con bcrypt.
- JWT firmado con RS256.
- JWK/JWKS para verificaciÃ³n pÃºblica.
- Middleware de autenticaciÃ³n.
- Control bÃ¡sico por rol.
- Limpieza de sesiÃ³n al cerrar sesiÃ³n.
- ValidaciÃ³n de rol en frontend antes de guardar JWT.

### ProtecciÃ³n contra inyecciÃ³n SQL

La conexiÃ³n a PostgreSQL utiliza consultas parametrizadas mediante el cliente `pg`.

Ejemplo conceptual:

```txt
SELECT ... FROM users WHERE rut = $1
```

Los valores ingresados por el usuario se envÃ­an como parÃ¡metros separados del texto SQL. Esto evita concatenar directamente datos del formulario dentro de la consulta y reduce el riesgo de inyecciÃ³n SQL.

TambiÃ©n se usa:

- RestricciÃ³n `UNIQUE` para `rut`.
- Manejo del error PostgreSQL `23505` para detectar usuarios duplicados.
- ValidaciÃ³n de roles permitidos: `usuario` y `funcionario`.

## 16. Rutas API

### PÃºblicas

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

El proyecto incluye una colecciÃ³n Postman para verificar el funcionamiento del backend.

Archivo:

```txt
postman/DOM_Santo_Domingo_API.postman_collection.json
```

La colecciÃ³n valida:

- `GET /api/health`
- `GET /api/jwks`
- `POST /api/auth/login` para usuario ciudadano.
- `POST /api/auth/login` para funcionario DOM.
- `POST /api/auth/register`
- `GET /api/users/me`
- `GET /api/users` con rol funcionario.
- `GET /api/tramites`
- `POST /api/tramites`
- Casos negativos: token faltante, credenciales invÃ¡lidas y trÃ¡mite sin tipo.

### Evidencia de ejecuciÃ³n

Se ejecutaron verificaciones locales desde terminal para respaldar el cumplimiento:

```bash
npm run build
```

Resultado:

```txt
âœ“ built
```

TambiÃ©n se ejecutÃ³ una prueba de API que verificÃ³:

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

ValidaciÃ³n de colecciÃ³n Postman:

```txt
postman-collection-json-ok
```

### CÃ³mo ejecutar la colecciÃ³n

1. Levantar backend:

```bash
npm run dev:api
```

2. Importar en Postman o Insomnia:

```txt
postman/DOM_Santo_Domingo_API.postman_collection.json
```

3. Ejecutar los requests en orden. La colecciÃ³n guarda tokens de usuario y funcionario para probar rutas protegidas.

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
3. Inicia sesiÃ³n.
4. Revisa el menÃº principal.
5. Consulta solicitudes.
6. Revisa notificaciones.
7. Sube documentos.
8. Revisa mensajes y observaciones.
```

### Funcionario DOM

```txt
1. Ingresa a la plataforma.
2. Selecciona "Funcionario".
3. Inicia sesiÃ³n.
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
4. El backend guarda usuario con hash de contraseÃ±a.
5. El sistema vuelve al login correspondiente.
```

### Cierre de sesiÃ³n

```txt
1. Usuario o funcionario presiona "Cerrar Sesion".
2. El frontend elimina token y usuario del localStorage.
3. El sistema vuelve a la pantalla inicial.
```

## 20. InstalaciÃ³n

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

## 21. EjecuciÃ³n

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
- Si PostgreSQL no estÃ¡ disponible, el backend usa memoria temporal para que el sistema no se caiga en desarrollo.
- Varias pantallas de trÃ¡mites, notificaciones y mensajerÃ­a aÃºn usan datos de mockup.
- El login, registro, cierre de sesiÃ³n y protecciÃ³n de rutas ya estÃ¡n conectados al backend.
- Para producciÃ³n se recomienda persistir tambiÃ©n trÃ¡mites, documentos, mensajes y notificaciones en PostgreSQL.

## 23. PrÃ³ximos Pasos

- Conectar trÃ¡mites, documentos, mensajes y notificaciones a PostgreSQL.
- Agregar carga real de archivos.
- Implementar refresh tokens.
- Agregar pruebas automatizadas con Jest, Vitest o Supertest.
- Agregar validaciÃ³n avanzada de formularios.
- Mejorar permisos granulares por rol.
- Agregar almacenamiento seguro para documentos PDF.
