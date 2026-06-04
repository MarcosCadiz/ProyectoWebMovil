# API DOM Santo Domingo

Servidor Node.js/Express para autenticacion, rutas base del proyecto, tokens JWT y manejo inicial de datos DOM.

## Comandos

```bash
npm run dev:api
```

La API queda disponible en:

```txt
http://127.0.0.1:4000/api
```

## Variables de entorno

Crear `.env` desde `.env.example`:

```bash
copy .env.example .env
```

Variables principales:

```txt
API_PORT=4000
CORS_ORIGIN=http://127.0.0.1:5173
JWT_ISSUER=dom-santo-domingo-api
JWT_AUDIENCE=dom-santo-domingo-client
JWT_EXPIRES_IN=2h
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/dom_santo_domingo
```

## Base de datos

El modelo relacional PostgreSQL esta definido en:

```txt
database/postgresql/schema.sql
database/postgresql/seed.sql
docs/modelo-relacional.md
```

Comandos sugeridos:

```bash
createdb dom_santo_domingo
psql -d dom_santo_domingo -f database/postgresql/schema.sql
psql -d dom_santo_domingo -f database/postgresql/seed.sql
```

Estado actual: el backend sigue funcionando con datos en memoria mientras se conecta la capa persistente real. Esto permite probar el frontend y la API aunque PostgreSQL no este levantado.

## Usuarios demo

```txt
Usuario:
RUT: 12.345.678-9
Password: Usuario123

Funcionario:
RUT: 9.876.543-2
Password: Funcionario123
```

## Rutas publicas

```txt
GET  /api/health
GET  /api/jwks
GET  /api/.well-known/jwks.json
POST /api/auth/register
POST /api/auth/login
```

## Rutas protegidas

Enviar el token en el header:

```txt
Authorization: Bearer <accessToken>
```

```txt
GET  /api/users/me
GET  /api/users              Solo funcionario
GET  /api/tramites
POST /api/tramites
```

## Pruebas Postman

Coleccion:

```txt
postman/DOM_Santo_Domingo_API.postman_collection.json
```

La coleccion valida:

- Estado de API.
- JWKS.
- Login usuario y funcionario.
- Registro.
- Rutas protegidas con token.
- Rutas por rol.
- Creacion/listado de tramites.
- Errores esperados sin token, credenciales invalidas y body incompleto.

Importar la coleccion en Postman y ejecutar en orden. La variable `baseUrl` viene configurada como:

```txt
http://127.0.0.1:4000/api
```

## Token

El login devuelve un JWT firmado con RS256. La clave publica se expone como JWK/JWKS en:

```txt
/api/jwks
/api/.well-known/jwks.json
```
