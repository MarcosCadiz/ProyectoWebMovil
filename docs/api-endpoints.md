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
    "id": "TR-1760000000000",
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

### GET /tramites/:id

Obtiene un tramite especifico por ID.

Respuesta `200`:

```json
{
  "tramite": {
    "id": "TR-45092",
    "tipo": "Permiso de Obra Menor",
    "estado": "En Revision",
    "fechaIngreso": "02/05/2026",
    "solicitante": "Juan Perez",
    "descripcion": "Tramite de demostracion para revision DOM."
  }
}
```

Errores:

- `401 AUTH_TOKEN_REQUIRED`
- `404 TRAMITE_NOT_FOUND`

### PUT /tramites/:id

Actualiza los datos editables de un tramite. Acepta `tipo`, `descripcion` y `estado`.

Body:

```json
{
  "tipo": "Permiso de Edificacion",
  "descripcion": "Solicitud corregida",
  "estado": "En Revision"
}
```

Respuesta `200`:

```json
{
  "tramite": {
    "id": "TR-45092",
    "tipo": "Permiso de Edificacion",
    "estado": "En Revision",
    "descripcion": "Solicitud corregida"
  }
}
```

Errores:

- `400 TRAMITE_UPDATE_REQUIRED`
- `401 AUTH_TOKEN_REQUIRED`
- `404 TRAMITE_NOT_FOUND`

### PATCH /tramites/:id

Actualiza parcialmente un tramite. Usa la misma validacion de `PUT`.

Body:

```json
{
  "estado": "Observado"
}
```

### DELETE /tramites/:id

Elimina un tramite por ID.

Respuesta:

```txt
204 No Content
```

Errores:

- `401 AUTH_TOKEN_REQUIRED`
- `404 TRAMITE_NOT_FOUND`

### POST /tramites/:id/decision

Emite una resolucion de funcionario y actualiza el estado del expediente. Requiere rol `funcionario`.

Body:

```json
{
  "decision": "Aprobado",
  "fundamento": "Los antecedentes cumplen los criterios revisados.",
  "document": "Texto completo de la resolucion emitida.",
  "nextSteps": [
    "Firmar digitalmente ante un proveedor autorizado",
    "Presentar la resolucion ante la DOM"
  ],
  "folio": "RES-2026-000123"
}
```

Respuesta `201`:

- Tramite actualizado.
- Documentos enviados por el usuario.
- Resolucion emitida.
- Folio y pasos posteriores visibles para el usuario.

Errores:

- `400 INVALID_TRAMITE_DECISION`
- `400 RESOLUTION_FIELDS_REQUIRED`
- `401 AUTH_TOKEN_REQUIRED`
- `403 INSUFFICIENT_ROLE`
- `404 TRAMITE_NOT_FOUND`

## Persistencia compartida

Cuando `DATABASE_URL` esta configurada, la API guarda:

- Expedientes en `tramites`.
- Antecedentes aportados por usuarios en `tramite_documentos`.
- Resoluciones de funcionarios en `tramite_resoluciones`.

Usuarios y funcionarios consultan la misma fuente mediante la API. Si PostgreSQL no esta configurado, se utiliza el mismo contrato con almacenamiento temporal en memoria.

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
7. GET tramite por ID.
8. PATCH/PUT tramite.
9. DELETE tramite.
10. Login funcionario.
11. GET users.
12. Pruebas negativas de token, login invalido y body invalido.
