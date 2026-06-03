# Plataforma DOM en Línea - Municipalidad de Santo Domingo

Proyecto web y móvil para digitalizar la gestión de trámites de la Dirección de Obras Municipales (DOM) de la Municipalidad de Santo Domingo.

## Integrantes

- Milovan Fuentes
- Amaro Fibla
- Marcos Cadiz

## Contexto del Proyecto

El proyecto corresponde a la asignatura **Ingeniería Web y Móvil (ICI4247-1)**. La propuesta busca resolver una problemática real de la comuna de Santo Domingo: la revisión manual de trámites, documentos y normativas dentro de la Dirección de Obras Municipales.

Actualmente, muchos procesos DOM dependen de revisión manual de formularios, planos, documentos y criterios normativos. Esto genera demoras, riesgo de errores, baja trazabilidad y dificultad para mantener informados a usuarios y funcionarios.

## Propósito

El propósito de la plataforma es entregar una solución digital que permita:

- Digitalizar la revisión y seguimiento de trámites DOM.
- Reducir tiempos de respuesta.
- Mejorar la trazabilidad de solicitudes.
- Facilitar la interacción entre usuarios y funcionarios.
- Mantener informado al usuario sobre el estado de sus solicitudes.
- Entregar una interfaz clara para usuarios ciudadanos y funcionarios municipales.
- Centralizar carga de documentos, notificaciones, observaciones y revisión normativa.

## Tecnologías Utilizadas

### Frontend

- React
- Vite
- React Router DOM
- CSS modularizado por dominio

### Backend

- Node.js
- Express
- bcrypt
- JSON Web Token (JWT)
- JWK/JWKS para exponer clave pública de verificación
- CORS
- dotenv

### Herramientas

- Visual Studio Code
- npm
- Git / GitHub

## Estructura General del Repositorio

```txt
.
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── brand/
│   │   ├── layout/
│   │   ├── navigation/
│   │   └── ui/
│   ├── data/
│   ├── features/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── notifications/
│   │   ├── requests/
│   │   ├── review/
│   │   ├── staff/
│   │   ├── upload/
│   │   └── user/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── styles/
├── server/
│   ├── app.js
│   ├── index.js
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── index.html
├── index.css
├── package.json
├── vite.config.js
└── .env.example
```

## Instalación

Clonar el repositorio y entrar a la carpeta del proyecto:

```bash
git clone https://github.com/MarcosCadiz/ProyectoWebMovil.git
cd ProyectoWebMovil
```

Instalar dependencias:

```bash
npm install
```

Crear archivo de variables de entorno a partir del ejemplo:

```bash
copy .env.example .env
```

En sistemas Linux/macOS:

```bash
cp .env.example .env
```

## Ejecución del Proyecto

### Levantar el frontend

```bash
npm run dev
```

URL por defecto:

```txt
http://127.0.0.1:5173
```

### Levantar el backend

En otra terminal:

```bash
npm run dev:api
```

URL de la API:

```txt
http://127.0.0.1:4000/api
```

### Compilar para producción

```bash
npm run build
```

## Scripts Disponibles

```txt
npm run dev       Levanta el frontend con Vite
npm run dev:web   Alias para levantar frontend
npm run dev:api   Levanta el backend Node.js/Express
npm run start:api Levanta el backend Node.js/Express
npm run build     Compila el frontend para producción
npm run preview   Previsualiza la build de producción
```

## Flujo Frontend

El frontend está construido con React y React Router. Cada pantalla principal vive en `src/pages`, pero la lógica visual está modularizada en `src/features` y `src/components`.

Flujo principal:

```txt
Inicio
├── Login Usuario
│   └── Menú Usuario
│       ├── Mis Solicitudes
│       ├── Notificaciones
│       ├── Subir Archivos
│       └── Chat / Mensajería
└── Login Funcionario
    └── Menú Funcionario
        └── Revisión de Solicitud
```

### Pantallas principales

- `/` - Pantalla de selección de tipo de inicio de sesión.
- `/login-usuario` - Login para usuarios ciudadanos.
- `/login-funcionario` - Login para funcionarios DOM.
- `/menu-usuario` - Panel principal del usuario.
- `/mis-solicitudes` - Listado y trazabilidad de solicitudes.
- `/notificaciones` - Centro de notificaciones.
- `/subir-archivos` - Gestor de documentos.
- `/chat-audiencia` - Historial y mensajería.
- `/menu-funcionario` - Bandeja de entrada del funcionario.
- `/revision-solicitudes` - Revisión normativa de una solicitud.

## Flujo Backend

El backend está construido con Node.js y Express. Su objetivo es entregar rutas API, autenticación, protección de rutas y emisión de tokens.

Flujo general:

```txt
Cliente React
    ↓
Rutas Express /api
    ↓
Controladores
    ↓
Servicios
    ↓
Datos en memoria
```

Por ahora los datos se guardan en memoria dentro de `server/data`. Esto permite probar el flujo completo sin base de datos. En una versión productiva, esta capa debería conectarse a una base de datos real.

## Autenticación

La autenticación usa:

- `bcrypt` para proteger contraseñas.
- `JWT` para generar tokens de sesión.
- `JWK/JWKS` para publicar la clave pública de verificación.

### Registro

Ruta:

```txt
POST /api/auth/register
```

Body:

```json
{
  "name": "Juan Pérez",
  "rut": "12.345.678-9",
  "password": "Usuario123",
  "role": "usuario"
}
```

El backend nunca guarda la contraseña original. Primero genera un hash con bcrypt y guarda únicamente ese hash.

### Login

Ruta:

```txt
POST /api/auth/login
```

Body:

```json
{
  "rut": "12.345.678-9",
  "password": "Usuario123"
}
```

Respuesta:

```json
{
  "user": {
    "name": "Juan Pérez",
    "rut": "12.345.678-9",
    "role": "usuario"
  },
  "accessToken": "eyJhbGciOiJSUzI1NiIs...",
  "tokenType": "Bearer"
}
```

El frontend guarda el token en `localStorage` usando:

```txt
dom_access_token
dom_user
```

## JWT y JWK

El login genera un **JWT** firmado con algoritmo `RS256`.

La clave privada firma el token. La clave pública se expone como JWK/JWKS para permitir verificación.

Rutas:

```txt
GET /api/jwks
GET /api/.well-known/jwks.json
```

Flujo:

```txt
Usuario inicia sesión
    ↓
Backend valida contraseña con bcrypt
    ↓
Backend firma JWT con clave privada
    ↓
Cliente guarda JWT
    ↓
Cliente envía Authorization: Bearer <token>
    ↓
Backend verifica JWT con clave pública
```

## Rutas API

### Rutas públicas

```txt
GET  /api/health
GET  /api/jwks
GET  /api/.well-known/jwks.json
POST /api/auth/register
POST /api/auth/login
```

### Rutas protegidas

Estas rutas requieren header:

```txt
Authorization: Bearer <accessToken>
```

```txt
GET  /api/users/me
GET  /api/tramites
POST /api/tramites
```

### Rutas protegidas por rol

Solo para funcionarios:

```txt
GET /api/users
```

## Usuarios Demo

```txt
Usuario ciudadano:
RUT: 12.345.678-9
Password: Usuario123

Funcionario DOM:
RUT: 9.876.543-2
Password: Funcionario123
```

## Flujos Funcionales

### Flujo de usuario ciudadano

```txt
1. Ingresa a la plataforma.
2. Selecciona "Usuario".
3. Inicia sesión.
4. Accede al menú de usuario.
5. Revisa solicitudes y estados.
6. Recibe notificaciones.
7. Sube documentos si tiene observaciones.
8. Puede revisar historial y mensajería.
```

### Flujo de funcionario DOM

```txt
1. Ingresa a la plataforma.
2. Selecciona "Funcionario".
3. Inicia sesión.
4. Accede a la bandeja de entrada.
5. Filtra o revisa solicitudes.
6. Entra a una solicitud.
7. Revisa antecedentes y documentos.
8. Completa checklist normativo.
9. Observa, rechaza o aprueba el trámite.
```

### Flujo de documentos

```txt
1. Usuario recibe observación.
2. Entra a notificaciones o gestor de documentos.
3. Adjunta o reemplaza archivos.
4. Envía solicitud actualizada.
5. El trámite continúa su revisión.
```

### Flujo de notificaciones

```txt
1. El sistema informa cambios de estado.
2. Usuario revisa el centro de notificaciones.
3. Puede subir documentos, descargar certificados o revisar trámite.
```

### Flujo de mensajería

```txt
1. Funcionario observa una solicitud.
2. Usuario revisa el historial.
3. Usuario responde o adjunta documentos.
4. Queda trazabilidad de la conversación.
```

## Seguridad Implementada

- Las contraseñas se guardan con hash bcrypt.
- Los tokens JWT se firman con RS256.
- Las rutas protegidas exigen token Bearer.
- Hay control básico de roles para funcionario.
- La clave pública se expone como JWK/JWKS.

## Consideraciones Actuales

- El backend usa datos en memoria, por lo que los datos se pierden al reiniciar el servidor.
- No existe base de datos persistente todavía.
- La integración frontend/backend está iniciada en el login.
- Las pantallas usan datos de mockup para mantener el diseño del prototipo.
- En una versión final se recomienda agregar base de datos, validación avanzada, refresh tokens y manejo de sesiones persistentes.

## Próximos Pasos Recomendados

- Agregar base de datos.
- Persistir usuarios, solicitudes, documentos y mensajes.
- Conectar todas las pantallas del frontend a la API.
- Agregar validaciones de formulario.
- Implementar refresh token.
- Crear pruebas unitarias e integración.
- Agregar carga real de archivos.
- Agregar panel administrativo para funcionarios.
