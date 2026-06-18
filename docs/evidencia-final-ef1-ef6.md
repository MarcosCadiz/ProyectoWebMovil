# Matriz de evidencia final — EF1 a EF6

Fecha de revisión: 18 de junio de 2026.

## Resumen

| Criterio | Evidencia principal | Estado |
|---|---|---|
| EF1 Funcionalidades | CRUD, documentos, resoluciones y notificaciones | Cumplido |
| EF2 UI/UX y rendimiento | Responsividad, accesibilidad, estados y paginación | Cumplido |
| EF3 Seguridad | JWT, bcrypt, SQL parametrizado, XSS, CORS y rate limit | Cumplido |
| EF4 Optimización | Consulta agregada sin N+1, filtros e índices | Cumplido |
| EF5 Servicio externo | OpenStreetMap y PostgreSQL Neon | Cumplido |
| EF6 Docker | Dockerfiles, Compose y validación de configuración | Parcial: runtime bloqueado por WSL |

## EF1 — Funcionalidades completas

- CRUD completo de trámites en interfaz y API.
- Documentos asociados al expediente.
- Checklist y resolución por funcionario.
- Notificación persistente al ciudadano.
- Lectura individual y masiva de notificaciones.
- Persistencia compartida PostgreSQL.

## EF2 — UI/UX y rendimiento

- Diseño responsivo para ambos roles.
- Carga, error, vacío, confirmación y feedback.
- Foco visible y navegación por teclado.
- Etiquetas accesibles, ARIA y movimiento reducido.
- Búsqueda, filtro y paginación.

## EF3 — Seguridad avanzada

- bcrypt y JWT RS256.
- Rutas y acciones protegidas por rol.
- Consultas parametrizadas.
- CORS por lista blanca.
- Detección de patrones XSS.
- Rate limit, límite de payload y cabeceras defensivas.
- TLS verificable para PostgreSQL remoto.

## EF4 — Optimización

- Consulta agregada para trámites, documentos y resolución.
- Eliminación del patrón N+1.
- `limit`, `offset`, `status` y `search`.
- Índices de relación y filtrado.

## EF5 — Integración externa

- OpenStreetMap embebido en el panel ciudadano.
- Neon PostgreSQL como servicio administrado verificado.

## EF6 — Docker

- Dockerfile independiente para backend.
- Build multietapa del frontend y Nginx.
- Compose con API, PostgreSQL y frontend.
- Healthchecks, dependencias y volumen.
- `docker compose config --quiet` validado.
- La ejecución del runtime no se completó porque el daemon Docker/WSL 2 no estaba disponible en el equipo.

## Comandos de evidencia

```bash
npm run build
npm run test:api
npm run db:verify
docker compose config --quiet
```

Consultar además:

- [Informe técnico](./Informe_Proyecto_DOM_Santo_Domingo.md)
- [Evidencia Docker](./evidencia-docker.md)
- [Endpoints](./api-endpoints.md)
