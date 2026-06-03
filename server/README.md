# API DOM Santo Domingo

Servidor Node.js/Express para autenticación y rutas base del proyecto.

## Comandos

```bash
npm run dev:api
```

La API queda disponible en:

```txt
http://localhost:4000/api
```

## Usuarios demo

```txt
Usuario:
RUT: 12.345.678-9
Password: Usuario123

Funcionario:
RUT: 9.876.543-2
Password: Funcionario123
```

## Rutas públicas

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

## Token

El login devuelve un JWT firmado con RS256. La clave pública se expone como JWK/JWKS en:

```txt
/api/jwks
/api/.well-known/jwks.json
```
