# Documentacion de endpoints API

Base local:

```txt
http://127.0.0.1:4000/api
```

## Estado del servicio

### GET /health

Verifica que la API este levantada.

Respuesta esperada:

```json
{
  "ok": true,
  "service": "dom-santo-domingo-api",
  "environment": "development",
  "persistence": "memory"
}
```

## Autenticacion

### POST /auth/register

Registra un usuario ciudadano o funcionario.

Body:

```json
{
  "name": "Juan Perez",
  "rut": "12.345.678-9",
  "password": "Usuario123",
  "role": "usuario"
}
```

Respuesta `201`:

```json
{
  "user": {
    "id": "uuid",
    "name": "Juan Perez",
    "rut": "12.345.678-9",
    "role": "usuario",
    "createdAt": "2026-06-03T00:00:00.000Z"
  }
}
```

Errores:

- `400 MISSING_REQUIRED_FIELDS`
- `400 PASSWORD_TOO_SHORT`
- `409 USER_ALREADY_EXISTS`

### POST /auth/login

Inicia sesion y devuelve JWT.

Body:

```json
{
  "rut": "12.345.678-9",
  "password": "Usuario123"
}
```

Respuesta `200`:

```json
{
  "user": {
    "id": "uuid",
    "name": "Juan Perez",
    "rut": "12.345.678-9",
    "role": "usuario"
  },
  "accessToken": "jwt",
  "tokenType": "Bearer"
}
```

Errores:

- `400 MISSING_CREDENTIALS`
- `401 INVALID_CREDENTIALS`

## Seguridad JWK/JWKS

### GET /jwks

Expone la clave publica para verificar tokens JWT firmados con RS256.

### GET /.well-known/jwks.json

Alias compatible con convenciones OpenID/JWKS.

## Usuarios

Todas las rutas de esta seccion requieren:

```txt
Authorization: Bearer <accessToken>
```

### GET /users/me

Devuelve el usuario autenticado.

Respuesta `200`:

```json
{
  "user": {
    "id": "uuid",
    "name": "Juan Perez",
    "rut": "12.345.678-9",
    "role": "usuario"
  }
}
```

### GET /users

Lista usuarios. Requiere rol `funcionario`.

Errores:

- `401 AUTH_TOKEN_REQUIRED`
- `401 INVALID_OR_EXPIRED_TOKEN`
- `403 INSUFFICIENT_ROLE`

## Tramites

Todas las rutas requieren token Bearer.

### GET /tramites

Lista tramites disponibles.

Respuesta `200`:

```json
{
  "tramites": []
}
```

### POST /tramites

Crea un tramite.

Body:

```json
{
  "tipo": "Permiso de Obra Menor",
  "descripcion": "Solicitud de prueba"
}
```

Respuesta `201`:

```json
{
  "tramite": {
    "id": "#1760000000000",
    "tipo": "Permiso de Obra Menor",
    "estado": "Nueva",
    "fechaIngreso": "2026-06-03T00:00:00.000Z",
    "solicitante": "Juan Perez",
    "descripcion": "Solicitud de prueba"
  }
}
```

Errores:

- `400 TRAMITE_TYPE_REQUIRED`
- `401 AUTH_TOKEN_REQUIRED`

## Pruebas Postman

Coleccion:

```txt
postman/DOM_Santo_Domingo_API.postman_collection.json
```

Orden recomendado:

1. Health.
2. JWKS.
3. Login usuario.
4. GET users/me.
5. GET tramites.
6. POST tramites.
7. Login funcionario.
8. GET users.
9. Pruebas negativas de token, login invalido y body invalido.
