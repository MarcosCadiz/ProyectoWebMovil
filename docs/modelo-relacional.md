# Modelo relacional — DOM Santo Domingo

## 1. Motor y archivos

Motor: PostgreSQL.

```text
database/postgresql/schema.sql
database/postgresql/seed.sql
database/postgresql/migrations/
```

El modelo usa UUID, claves foráneas, enums, JSONB e índices.

## 2. Relaciones

```text
users 1 ── N tramites                 solicitante_id
users 1 ── N tramites                 funcionario_id
tramites 1 ── N tramite_documentos
tramites 1 ── N tramite_resoluciones
tramites 1 ── N tramite_mensajes
tramites 1 ── N notifications
users 1 ── N notifications
users 1 ── N audit_events
```

## 3. Entidades

### `users`

Identidades ciudadanas y funcionarias.

| Campo | Tipo | Regla |
|---|---|---|
| `id` | UUID | PK |
| `name` | VARCHAR(120) | NOT NULL |
| `rut` | VARCHAR(20) | UNIQUE, NOT NULL |
| `email` | VARCHAR(160) | Opcional |
| `department` | VARCHAR(120) | Opcional |
| `password_hash` | VARCHAR(255) | NOT NULL |
| `role` | `user_role` | `usuario` o `funcionario` |
| `created_at` | TIMESTAMPTZ | Automático |
| `updated_at` | TIMESTAMPTZ | Automático |

### `tramites`

Expediente principal.

| Campo | Tipo | Regla |
|---|---|---|
| `id` | UUID | PK interna |
| `codigo` | VARCHAR(32) | Código público único |
| `tipo` | VARCHAR(120) | NOT NULL |
| `estado` | `tramite_estado` | Estado del flujo |
| `solicitante_id` | UUID | FK `users`, NOT NULL |
| `funcionario_id` | UUID | FK `users`, opcional |
| `direccion` | TEXT | Ubicación del proyecto |
| `descripcion` | TEXT | Descripción |
| `observaciones` | TEXT | Observaciones vigentes |
| `contenido_solicitud` | TEXT | Formulario generado |
| `fecha_ingreso` | TIMESTAMPTZ | Automático |

Estados: `Nueva`, `En Revision`, `Observado`, `Aprobado`, `Rechazado`.

### `tramite_documentos`

Metadatos y contenido demostrativo de antecedentes.

| Campo | Tipo | Descripción |
|---|---|---|
| `tramite_id` | UUID | FK con borrado en cascada |
| `nombre_archivo` | VARCHAR(180) | Nombre |
| `tipo_documento` | VARCHAR(120) | Categoría |
| `url_archivo` | TEXT | Referencia futura a storage |
| `tamano` | VARCHAR(40) | Tamaño visible |
| `contenido` | TEXT | Contenido demostrativo |
| `estado` | `documento_estado` | Estado de revisión |
| `uploaded_by` | UUID | FK al usuario |

### `tramite_resoluciones`

Decisiones emitidas por funcionarios.

| Campo | Tipo | Descripción |
|---|---|---|
| `tramite_id` | UUID | FK al expediente |
| `funcionario_id` | UUID | Emisor |
| `decision` | VARCHAR(20) | Aprobado, Rechazado u Observado |
| `fundamento` | TEXT | Justificación |
| `documento` | TEXT | Texto de resolución |
| `pasos_posteriores` | JSONB | Acciones para el ciudadano |
| `folio` | VARCHAR(80) | Identificador visible |

### `tramite_mensajes`

Mensajes asociados a un expediente. La tabla está preparada para evolución del chat demostrativo.

### `notifications`

Avisos persistentes.

| Campo | Tipo | Descripción |
|---|---|---|
| `user_id` | UUID | Destinatario |
| `tramite_id` | UUID | Expediente relacionado |
| `title` | VARCHAR(140) | Título |
| `body` | TEXT | Mensaje |
| `read_at` | TIMESTAMPTZ | Lectura opcional |
| `created_at` | TIMESTAMPTZ | Creación |

### `audit_events`

Estructura preparada para trazabilidad:

- usuario,
- tipo e ID de entidad,
- acción,
- metadatos JSONB,
- fecha.

## 4. Integridad y rendimiento

- `rut` y `codigo` son únicos.
- Las claves foráneas aplican `CASCADE`, `RESTRICT` o `SET NULL` según el caso.
- Las decisiones tienen restricción `CHECK`.
- Existen índices para rol, solicitante, funcionario, estado y entidades dependientes.
- Las consultas usan parámetros y no concatenan datos de usuario.

## 5. Instalación

Mediante scripts:

```bash
npm run db:migrate
npm run db:verify
```

O manualmente:

```bash
createdb dom_santo_domingo
psql -d dom_santo_domingo -f database/postgresql/schema.sql
psql -d dom_santo_domingo -f database/postgresql/seed.sql
```

Ejemplo local:

```dotenv
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/dom_santo_domingo
DATABASE_SSL=false
```

Ejemplo remoto:

```dotenv
DATABASE_URL=postgresql://USUARIO:CONTRASENA@HOST/NOMBRE_BASE?sslmode=require
DATABASE_SSL=true
```

## 6. Consideraciones

- PostgreSQL es la persistencia objetivo.
- El fallback en memoria es exclusivo para desarrollo.
- En producción, `contenido` debe sustituirse por object storage seguro.
- `audit_events` y `tramite_mensajes` están modelados, pero requieren ampliar su integración funcional.
