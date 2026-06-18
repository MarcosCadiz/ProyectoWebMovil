# Evidencia final de criterios EF1-EF5

Fecha de revision: 18 de junio de 2026.

## EF1 - Funcionalidades completas

- CRUD completo de tramites en API e interfaz.
- Documentos asociados a cada expediente.
- Resoluciones emitidas por funcionarios y visibles para ciudadanos.
- Notificaciones persistentes con lectura individual y masiva.
- Persistencia PostgreSQL compartida y fallback local controlado.

## EF2 - UI/UX y rendimiento

- Vistas responsivas para ciudadano y funcionario.
- Estados de carga, error, vacio y confirmacion.
- Navegacion por teclado con foco visible.
- Etiquetas accesibles, anuncios `aria-live`, tablas con descripcion y soporte de movimiento reducido.
- Paginacion y filtros para evitar transferencias innecesarias.

## EF3 - Seguridad avanzada

- JWT RS256, autorizacion por roles y contrasenas con bcrypt.
- CORS mediante lista blanca.
- Limite de payload, rate limiting y cabeceras defensivas.
- Validacion explicita y rechazo de patrones XSS.
- Consultas PostgreSQL parametrizadas y TLS con verificacion de certificado.

## EF4 - Consultas optimizadas

- Listado de tramites sin consultas N+1.
- Filtros, limite y desplazamiento parametrizados.
- Indices para solicitante, funcionario, estado, documentos, resoluciones y notificaciones.

## EF5 - Servicio externo

- Integracion cartografica con OpenStreetMap para ubicacion municipal.
- PostgreSQL remoto Neon utilizado como servicio administrado compartido.

## Verificacion ejecutable

```bash
npm run build
npm run test:api
npm run db:verify
```

El smoke test cubre autenticacion, roles, CRUD, documentos, resoluciones, notificaciones, paginacion, bloqueo XSS y errores controlados.

## Alcance

Docker (EF6) fue excluido de esta entrega por decision del equipo y no se declara como criterio completado.
