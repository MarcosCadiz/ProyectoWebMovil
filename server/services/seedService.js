import { createUser, findUserByRut } from '../data/usersStore.js';
import { hashPassword } from './passwordService.js';

const seedUsers = [
  {
    name: 'Juan Pérez',
    rut: '12.345.678-9',
    password: 'Usuario123',
    role: 'usuario',
  },
  {
    name: 'Roberto Gómez',
    rut: '9.876.543-2',
    password: 'Funcionario123',
    role: 'funcionario',
  },
];

export async function seedInitialUsers() {
  for (const user of seedUsers) {
    if (findUserByRut(user.rut)) continue;

    createUser({
      name: user.name,
      rut: user.rut,
      role: user.role,
      passwordHash: await hashPassword(user.password),
    });
  }
}
