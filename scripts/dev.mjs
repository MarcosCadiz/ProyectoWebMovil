import { createServer as createViteServer } from 'vite';
import { startApi } from '../server/index.js';

let api;
let web;
let stopping = false;

async function shutdown(exitCode = 0) {
  if (stopping) return;
  stopping = true;

  await Promise.allSettled([
    web?.close(),
    api
      ? new Promise((resolve) => api.close(resolve))
      : Promise.resolve(),
  ]);

  process.exit(exitCode);
}

try {
  api = await startApi();
  web = await createViteServer({ configLoader: 'runner' });
  await web.listen();
  web.printUrls();
  console.log('Frontend y API iniciados. Presiona Ctrl+C para detenerlos.');
} catch (error) {
  console.error(`No fue posible iniciar la aplicacion: ${error.message}`);
  await shutdown(1);
}

process.once('SIGINT', () => shutdown(0));
process.once('SIGTERM', () => shutdown(0));
