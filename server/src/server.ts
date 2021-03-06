import { createApp } from './app';
import * as db from './db';

async function initServer(): Promise<void> {
  const app = createApp();

  try {
    await db.init();
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
  // start the server
  app.listen(9000, (): void => {
    console.log('Server listening on port: 9000');
  });
}

initServer();
