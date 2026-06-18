import { createApp } from './app.js';
import { env } from './config/env.js';
import { ensureDatabaseSchema } from './services/databaseService.js';
import { seedInitialUsers } from './services/seedService.js';
import { pathToFileURL } from 'node:url';

export async function startApi() {
  await ensureDatabaseSchema();
  await seedInitialUsers();

  const app = createApp();

  return new Promise((resolve, reject) => {
    const server = app.listen(env.port, '127.0.0.1', () => {
      console.log(`API DOM corriendo en http://127.0.0.1:${env.port}`);
      resolve(server);
    });

    server.once('error', reject);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await startApi();
}
