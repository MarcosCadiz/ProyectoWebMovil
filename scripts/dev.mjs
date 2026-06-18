import { createServer } from 'vite';
import '../server/index.js';

const vite = await createServer();
await vite.listen();
vite.printUrls();

console.log('Frontend y API iniciados. Presiona Ctrl+C para detener ambos servicios.');

async function shutdown() {
  await vite.close();
  process.exit(0);
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
