import { createApp } from './app.js';
import { env } from './config/env.js';
import { seedInitialUsers } from './services/seedService.js';

await seedInitialUsers();

const app = createApp();

app.listen(env.port, () => {
  console.log(`API DOM corriendo en http://localhost:${env.port}`);
});
