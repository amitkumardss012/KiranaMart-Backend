import { Express } from 'express';

let isRunning = false;

export const startServer = (app: Express, port: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isRunning) {
      reject(new Error('Server is already running.'));
      return;
    }

    app.listen(port, () => {
      isRunning = true;
      console.log(`Server is running on  ➜  http://localhost:${port}`);
      resolve();
    }).on('error', (err) => {
      reject(err);
    });
  });
};


export const stopServer = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!isRunning) {
      resolve();
      return;
    }

    try {
      console.log('Shutting down the server...');
      isRunning = false;
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const handleShutdown = async () => {
  console.log('Received termination signal. Stopping the server...');
  try {
    await stopServer();
    console.log('Server stopped successfully.');
  } catch (err) {
    console.error('Error during shutdown:', err);
  } finally {
    process.exit(0);
  }
};
