# Plataforma DOM en Linea - Municipalidad de Santo Domingo

Proyecto web y movil para digitalizar la gestion de tramites de la Direccion de Obras Municipales (DOM) de la Municipalidad de Santo Domingo.

La plataforma permite separar el acceso de usuarios ciudadanos y funcionarios DOM, registrar nuevos usuarios, iniciar sesion con JWT, proteger rutas privadas, consultar tramites y preparar la base para persistencia en PostgreSQL.

## Integrantes

- Milovan Fuentes
- Amaro Fibla
- Marcos Cadiz

## Proposito

El objetivo del proyecto es mejorar la gestion DOM mediante una plataforma digital que reduzca tiempos de respuesta, mejore la trazabilidad de solicitudes, ordene la comunicacion entre usuarios y funcionarios, y centralice documentos, observaciones, estados y notificaciones.

## Tecnologias principales

Frontend:

- React
- Vite
- React Router DOM
- Axios
- CSS modularizado

Backend:

- Node.js
- Express
- bcrypt
- JWT con RS256
- JWK/JWKS
- PostgreSQL con fallback en memoria
- dotenv
- CORS

Herramientas:

- Visual Studio Code
- npm
- Git / GitHub
- Postman o Insomnia

## Estructura resumida

```txt
.
|-- src/                     Frontend React
|   |-- components/           Componentes reutilizables
|   |-- features/             Modulos por dominio
|   |-- pages/                Pantallas principales
|   |-- routes/               Rutas publicas y protegidas
|   |-- services/             Cliente API, auth y sesion
|   `-- styles/               Estilos por flujo
|-- server/                  Backend Node.js/Express
|   |-- config/               Configuracion de base de datos
|   |-- controllers/          Controladores HTTP
|   |-- data/                 Store en memoria/PostgreSQL
|   |-- middleware/           Auth, roles y errores
|   |-- routes/               Rutas API
|   `-- services/             Auth, JWT, seed y base de datos
|-- database/postgresql/     Schema, seed y migraciones
|-- docs/                    Documentacion tecnica e informe
|-- postman/                 Coleccion de pruebas API
|-- package.json
`-- .env.example
```

## Prerrequisitos

Antes de instalar el proyecto, asegúrate de tener:

- Node.js en version LTS.
- npm instalado junto con Node.js.
- Visual Studio Code u otro editor de codigo.
- Git para clonar y versionar el repositorio.

Puedes verificar Node.js y npm con:

```bash
node -v
npm -v
```

## Instalacion

Clonar el repositorio:

```bash
git clone https://github.com/MarcosCadiz/ProyectoWebMovil.git
cd ProyectoWebMovil
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo de variables de entorno:

```bash
copy .env.example .env
```

En Linux/macOS:

```bash
cp .env.example .env
```

## Variables de entorno

El archivo `.env.example` sirve como plantilla. Copialo como `.env` y completa los valores necesarios para tu entorno local.

Ejemplo general:

```txt
PORT=4000
CLIENT_URL=http://127.0.0.1:5173
JWT_ISSUER=dom-santo-domingo
JWT_AUDIENCE=dom-santo-domingo-client
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/dom_santo_domingo
```

Si `DATABASE_URL` no esta configurado o PostgreSQL no esta disponible, la API puede funcionar con datos en memoria para pruebas locales.

Para un equipo de trabajo se recomienda una base PostgreSQL remota. Cada integrante debe guardar la misma URL en su archivo local `.env`:

```txt
DATABASE_URL=postgresql://USUARIO:CONTRASENA@HOST-REMOTO/NOMBRE_BASE?sslmode=require
DATABASE_SSL=true
```

La URL es secreta y nunca debe incluirse en GitHub. Luego se prepara y verifica la base con:

```bash
npm run db:migrate
npm run db:verify
```

## Ejecucion

Levantar frontend:

```bash
npm run dev
```

URL frontend:

```txt
http://127.0.0.1:5173
```

Levantar backend en otra terminal:

```bash
npm run dev:api
```

URL API:

```txt
http://127.0.0.1:4000/api
```

Compilar frontend:

```bash
npm run build
```

## Scripts disponibles

```txt
npm run dev        Levanta el frontend con Vite
npm run dev:web    Alias para frontend
npm run dev:api    Levanta la API Node.js/Express
npm run start:api  Levanta la API en modo normal
npm run build      Compila el frontend
npm run preview    Previsualiza la build
npm run test:api   Ejecuta prueba smoke de API, JWT, roles y CRUD
```

## Flujos principales

Usuario ciudadano:

```txt
Inicio -> Login Usuario -> Registro Usuario -> Menu Usuario -> Solicitudes / Notificaciones / Documentos / Chat
```

Funcionario DOM:

```txt
Inicio -> Login Funcionario -> Registro Funcionario -> Menu Funcionario -> Revision de solicitudes
```

Autenticacion:

```txt
Registro/Login -> API Auth -> bcrypt/JWT -> token en navegador -> rutas protegidas -> validacion de rol
```

Base de datos:

```txt
API Express -> servicios -> PostgreSQL con consultas parametrizadas -> fallback en memoria si no hay conexion
```

## Rutas principales del frontend

```txt
/                     Inicio
/login-usuario        Login ciudadano
/login-funcionario    Login funcionario
/registro             Selector de tipo de registro
/registro-usuario     Registro ciudadano
/registro-funcionario Registro funcionario
/menu-usuario         Panel del usuario
/menu-funcionario     Panel del funcionario
/mis-solicitudes      Solicitudes del usuario
/notificaciones       Centro de notificaciones
/subir-archivos       Carga de documentos
/chat-audiencia       Mensajeria
/revision-solicitudes Revision DOM
```

## API principal

Rutas publicas:

```txt
GET  /api/health
GET  /api/jwks
GET  /api/.well-known/jwks.json
POST /api/auth/register
POST /api/auth/login
```

Rutas protegidas:

```txt
GET  /api/users/me
GET  /api/tramites
POST /api/tramites
GET  /api/tramites/:id
PUT  /api/tramites/:id
PATCH /api/tramites/:id
DELETE /api/tramites/:id
```

Ruta protegida por rol funcionario:

```txt
GET /api/users
```

La documentacion completa de endpoints esta en [docs/api-endpoints.md](./docs/api-endpoints.md).

## Seguridad

El proyecto implementa:

- Hash de contrasenas con bcrypt.
- Tokens JWT firmados con RS256.
- Publicacion de clave publica mediante JWK/JWKS.
- Rutas protegidas con header `Authorization: Bearer <token>`.
- Validacion de roles para separar usuario ciudadano y funcionario.
- Consultas parametrizadas en PostgreSQL para reducir riesgo de inyeccion SQL.
- Manejo centralizado de errores para evitar caidas por entradas invalidas.

## Pruebas API

La coleccion Postman esta disponible en:

[postman/DOM_Santo_Domingo_API.postman_collection.json](./postman/DOM_Santo_Domingo_API.postman_collection.json)

La coleccion permite validar healthcheck, login, registro, rutas protegidas, control de roles, CRUD de tramites y errores esperados.

Para ejecutarla:

```bash
npm run dev:api
```

Luego importar la coleccion en Postman o Insomnia y ejecutar los requests en orden.

Tambien se puede ejecutar una verificacion automatizada local:

```bash
npm run test:api
```

## Base de datos

Archivos principales:

- [database/postgresql/schema.sql](./database/postgresql/schema.sql)
- [database/postgresql/seed.sql](./database/postgresql/seed.sql)
- [database/postgresql/migrations](./database/postgresql/migrations)
- [docs/modelo-relacional.md](./docs/modelo-relacional.md)

Crear base local:

```bash
createdb dom_santo_domingo
psql -d dom_santo_domingo -f database/postgresql/schema.sql
psql -d dom_santo_domingo -f database/postgresql/seed.sql
```

## Usuarios demo

Usuario ciudadano:

```txt
RUT: 12.345.678-9
Password: Usuario123
```

Funcionario DOM:

```txt
RUT: 9.876.543-2
Password: Funcionario123
```

## Documentacion tecnica completa

El README resume lo necesario para instalar, ejecutar y comprender el proyecto. Los detalles extensos de arquitectura, backend, frontend, consumo de API, interceptores, seguridad, inyeccion SQL, pruebas API, modelo relacional y evidencias estan en el informe tecnico:

[Ver informe tecnico del proyecto](./docs/Informe_Proyecto_DOM_Santo_Domingo.md)

Documentos complementarios:

- [Endpoints API](./docs/api-endpoints.md)
- [Modelo relacional](./docs/modelo-relacional.md)
- [Evidencia final EF1-EF5](./docs/evidencia-final-ef1-ef5.md)
- [Coleccion Postman](./postman/DOM_Santo_Domingo_API.postman_collection.json)

## Estado actual

El proyecto cuenta con frontend funcional, backend Express, autenticacion con JWT, registro de usuarios y funcionarios, rutas protegidas, validacion de roles, modelo relacional PostgreSQL, coleccion Postman y documentacion tecnica para el segundo avance.
