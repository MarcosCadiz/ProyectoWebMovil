# Modelo relacional DOM Santo Domingo

Este avance define el modelo relacional base para persistir usuarios, tramites, documentos, mensajes, notificaciones y eventos de auditoria.

Motor elegido: PostgreSQL.

Archivo SQL principal:

```txt
database/postgresql/schema.sql
```

## Tablas

### users

Guarda usuarios ciudadanos y funcionarios.

Campos principales:

- `id`: identificador UUID.
- `name`: nombre del usuario.
- `rut`: identificador unico de acceso.
- `password_hash`: contrasena protegida con bcrypt.
- `role`: `usuario` o `funcionario`.

Relacion:

- Un usuario puede crear muchos tramites.
- Un funcionario puede estar asignado a muchos tramites.

### tramites

Representa una solicitud DOM.

Campos principales:

- `codigo`: codigo visible del tramite, por ejemplo `#45092`.
- `tipo`: tipo de solicitud.
- `estado`: `Nueva`, `En Revision`, `Observado`, `Aprobado` o `Rechazado`.
- `solicitante_id`: usuario ciudadano que crea el tramite.
- `funcionario_id`: funcionario asignado, opcional.

Relacion:

- Un tramite pertenece a un solicitante.
- Un tramite puede tener documentos, mensajes, notificaciones y auditoria.

### tramite_documentos

Guarda archivos o referencias a archivos asociados al tramite.

Campos principales:

- `tramite_id`: tramite asociado.
- `nombre_archivo`: nombre del archivo cargado.
- `tipo_documento`: categoria del documento.
- `url_archivo`: ubicacion del archivo si se guarda en storage.
- `estado`: estado de revision del documento.

### tramite_mensajes

Guarda la conversacion entre usuario y funcionario.

Campos principales:

- `tramite_id`: tramite asociado.
- `sender_id`: usuario que envia el mensaje.
- `mensaje`: contenido.

### notifications

Guarda avisos para usuarios.

Campos principales:

- `user_id`: destinatario.
- `tramite_id`: tramite relacionado, opcional.
- `title`: titulo.
- `body`: detalle.
- `read_at`: fecha de lectura.

### audit_events

Guarda trazabilidad tecnica y funcional.

Campos principales:

- `user_id`: usuario que ejecuta la accion.
- `entity_type`: entidad afectada.
- `entity_id`: id de la entidad.
- `action`: accion realizada.
- `metadata`: detalle flexible en JSONB.

## Diagrama simple

```txt
users 1 ---- N tramites
users 1 ---- N tramite_mensajes
tramites 1 ---- N tramite_documentos
tramites 1 ---- N tramite_mensajes
tramites 1 ---- N notifications
tramites 1 ---- N audit_events
users 1 ---- N notifications
```

## Instalacion local sugerida

Crear base:

```bash
createdb dom_santo_domingo
```

Ejecutar esquema:

```bash
psql -d dom_santo_domingo -f database/postgresql/schema.sql
```

Cargar datos de desarrollo:

```bash
psql -d dom_santo_domingo -f database/postgresql/seed.sql
```

Variables sugeridas:

```txt
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/dom_santo_domingo
```
