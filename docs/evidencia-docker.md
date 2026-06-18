# Evidencia basica de Docker

Fecha de revision: 18 de junio de 2026.

## Configuracion incluida

- `Dockerfile.backend`: imagen Node.js 22 Alpine para la API Express.
- `Dockerfile.frontend`: compilacion Vite en Node.js y publicacion con Nginx.
- `docker-compose.yml`: orquestacion de PostgreSQL, backend y frontend.
- `docker/nginx.conf`: soporte de rutas SPA y proxy `/api` hacia el backend.
- Healthchecks para los tres servicios.
- Volumen persistente para PostgreSQL.

## Validaciones basicas

Comandos utilizados:

```bash
docker compose version
docker compose config --quiet
docker compose config
```

Resultado:

```txt
docker compose config --quiet -> OK
Servicios resueltos: database, backend, frontend
Imagen externa: postgres:16-alpine
Imagenes construibles: figma-backend, figma-frontend
```

La configuracion Compose se valida sin errores y resuelve los servicios, redes, volumen, variables, dependencias, puertos y healthchecks.

## Prueba de inicio

Se intento consultar el motor con:

```bash
docker version
docker compose up --build -d
```

Resultado del intento:

```txt
El cliente Docker y Docker Compose estan instalados.
El daemon docker_engine no esta disponible.
Windows informa adicionalmente que WSL no esta instalado.
```

Por lo tanto, no fue posible descargar `postgres:16-alpine` ni iniciar los contenedores en este equipo. Esta es una limitacion del entorno local, no un error de sintaxis de los archivos Docker.

Una vez habilitado WSL 2 y abierto Docker Desktop, la comprobacion minima pendiente es:

```bash
docker compose up --build -d
docker compose ps
curl http://localhost:4000/api/health
docker compose down
```
