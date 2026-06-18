# Evidencia básica de Docker

Fecha de revisión: 18 de junio de 2026.

## Resultado ejecutivo

| Verificación | Resultado |
|---|---|
| Cliente Docker | Instalado |
| Docker Compose | Instalado |
| Sintaxis Compose | Correcta |
| Resolución de servicios | Correcta |
| Build e inicio de contenedores | No ejecutado por daemon/WSL 2 ausente |

Este documento no presenta el despliegue como exitoso. Registra la configuración validada y la limitación concreta del equipo de prueba.

## Configuración incluida

- `Dockerfile.backend`: imagen Node.js 22 Alpine para la API Express.
- `Dockerfile.frontend`: compilación Vite en Node.js y publicación con Nginx.
- `docker-compose.yml`: orquestación de PostgreSQL, backend y frontend.
- `docker/nginx.conf`: soporte de rutas SPA y proxy `/api` hacia el backend.
- Healthchecks para los tres servicios.
- Volumen persistente para PostgreSQL.

## Validaciones básicas

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
Imágenes construibles: figma-backend, figma-frontend
```

La configuración Compose se valida sin errores y resuelve los servicios, red, volumen, variables, dependencias, puertos y healthchecks.

## Prueba de inicio

Se intentó consultar el motor con:

```bash
docker version
docker compose up --build -d
```

Resultado del intento:

```txt
El cliente Docker y Docker Compose están instalados.
El daemon docker_engine no está disponible.
Windows informa adicionalmente que WSL no está instalado.
```

Por lo tanto, no fue posible descargar `postgres:16-alpine` ni iniciar los contenedores en este equipo. Esta es una limitación del entorno local, no un error de sintaxis de los archivos Docker.

Una vez habilitado WSL 2 y abierto Docker Desktop, la comprobación mínima pendiente es:

```bash
docker compose up --build -d
docker compose ps
curl http://localhost:4000/api/health
docker compose down
```
