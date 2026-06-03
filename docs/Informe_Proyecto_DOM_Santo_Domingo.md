# Informe Técnico - Plataforma DOM en Línea

## Identificación del Proyecto

**Nombre:** Plataforma DOM en Línea  
**Institución objetivo:** Municipalidad de Santo Domingo  
**Área:** Dirección de Obras Municipales (DOM)  
**Asignatura:** Ingeniería Web y Móvil (ICI4247-1)

## Integrantes

- Milovan Fuentes
- Amaro Fibla
- Marcos Cadiz

## Propósito del Proyecto

La plataforma busca digitalizar y ordenar el proceso de gestión de trámites de la Dirección de Obras Municipales. El objetivo es disminuir la dependencia de revisiones manuales, mejorar la trazabilidad de solicitudes y facilitar la comunicación entre usuarios ciudadanos y funcionarios municipales.

La solución contempla pantallas para login diferenciado, bandeja de usuario, bandeja de funcionario, seguimiento de solicitudes, notificaciones, carga de documentos, mensajería y revisión normativa.

## Problema Detectado

Las Direcciones de Obras Municipales suelen revisar documentos, formularios, planos y normativas de forma manual. Esto genera:

- Demoras en la revisión.
- Posibilidad de errores humanos.
- Baja trazabilidad.
- Dificultad para informar oportunamente al usuario.
- Sobrecarga administrativa para funcionarios.
- Gestión documental dispersa.

## Solución Propuesta

El sistema propone una plataforma web que centraliza:

- Inicio de sesión de usuarios y funcionarios.
- Seguimiento de solicitudes.
- Carga y reemplazo de documentos.
- Notificaciones de cambios de estado.
- Mensajería entre usuario y funcionario.
- Bandeja de entrada para funcionarios.
- Revisión normativa con checklist.
- Acciones de aprobar, rechazar u observar trámites.

## Arquitectura General

El proyecto se divide en dos capas principales:

```txt
Frontend React/Vite
    ↓
Backend Node.js/Express
    ↓
Datos en memoria
```

### Frontend

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

### Backend

El backend está construido con Node.js y Express. Entrega rutas API, autenticación, hashing de contraseñas y emisión de tokens.

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

## Tecnologías Utilizadas

### Frontend

- React
- Vite
- React Router DOM
- CSS modularizado

### Backend

- Node.js
- Express
- bcrypt
- jsonwebtoken
- CORS
- dotenv

## Instalación

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

## Ejecución

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

## Flujo Frontend

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

## Flujo Backend

```txt
Request HTTP
    ↓
Ruta Express
    ↓
Controlador
    ↓
Servicio
    ↓
Datos en memoria
    ↓
Respuesta JSON
```

## Autenticación

El backend permite registrar e iniciar sesión con RUT y contraseña.

### Hash de Contraseñas

Las contraseñas no se almacenan directamente. Se procesan con bcrypt:

```txt
Contraseña original
    ↓
bcrypt
    ↓
Hash seguro
```

### Login y Token

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

Esto permite verificar que el token fue firmado por el servidor.

## Rutas API

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

### Documentos

```txt
1. Usuario recibe observación.
2. Ingresa al gestor de documentos.
3. Adjunta o reemplaza archivo.
4. Envía la solicitud actualizada.
```

### Notificaciones

```txt
1. El sistema informa cambios de estado.
2. Usuario revisa centro de notificaciones.
3. Puede ir a trámite, subir documento o descargar certificado.
```

### Mensajería

```txt
1. Funcionario emite observación.
2. Usuario revisa historial.
3. Usuario responde.
4. Se mantiene trazabilidad.
```

## Seguridad

El sistema implementa:

- Hash de contraseñas con bcrypt.
- JWT firmado con RS256.
- JWK/JWKS para verificación pública.
- Middleware de autenticación.
- Control básico por rol.

## Consideraciones

- Los datos se guardan en memoria.
- Al reiniciar el servidor, se reinician los datos.
- Las pantallas mantienen datos de mockup en varias secciones.
- El login ya se conecta al backend real.
- Para producción se recomienda agregar base de datos y almacenamiento real de archivos.

## Próximos Pasos

- Integrar base de datos.
- Persistir usuarios y solicitudes.
- Agregar carga real de archivos.
- Conectar todos los módulos del frontend a la API.
- Implementar refresh tokens.
- Agregar pruebas automatizadas.
- Agregar validación avanzada de formularios.
- Mejorar control de roles y permisos.
