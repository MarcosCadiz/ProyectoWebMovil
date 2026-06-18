import { createTramiteStore, listTramitesStore } from '../data/tramitesStore.js';
import {
  createUser,
  findUserByRut,
  sanitizeUser,
  updateUserCredentials,
} from '../data/usersStore.js';
import { comparePassword, hashPassword } from './passwordService.js';

const seedUsers = [
  {
    name: 'Juan Perez',
    rut: '12.345.678-9',
    password: 'Usuario123',
    role: 'usuario',
  },
  {
    name: 'Roberto Gomez',
    rut: '9.876.543-2',
    password: 'Funcionario123',
    role: 'funcionario',
  },
];

export async function seedInitialUsers() {
  for (const user of seedUsers) {
    const existing = await findUserByRut(user.rut);
    const passwordMatches = existing
      ? await comparePassword(user.password, existing.passwordHash)
      : false;

    if (!existing) {
      await createUser({
        name: user.name,
        rut: user.rut,
        role: user.role,
        passwordHash: await hashPassword(user.password),
      });
    } else if (!passwordMatches || existing.role !== user.role || existing.name !== user.name) {
      await updateUserCredentials(user.rut, {
        name: user.name,
        role: user.role,
        passwordHash: await hashPassword(user.password),
      });
    }
  }

  const demoUser = sanitizeUser(await findUserByRut('12.345.678-9'));
  const existingTramites = await listTramitesStore(demoUser);

  if (!existingTramites.length) {
    await createTramiteStore({
      tipo: 'Permiso de Obra Menor',
      direccion: 'Las Araucarias 450, Santo Domingo',
      descripcion: 'Solicitud demo de ampliacion menor de vivienda.',
      observaciones: 'Antecedentes enviados para revision normativa.',
      contenidoSolicitud: 'Solicitud digital demo generada por Juan Perez.',
      documents: [
        {
          name: 'Formulario_Solicitud.pdf',
          category: 'Formulario DOM',
          size: '184 KB',
          content: 'Formulario oficial demo enviado por el usuario Juan Perez.',
        },
        {
          name: 'Plano_Arquitectura.pdf',
          category: 'Plano',
          size: '1.8 MB',
          content: 'Plano demo A-01, escala referencial 1:100.',
        },
      ],
    }, demoUser);
  }
}
