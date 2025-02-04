import app from "./app";
import { handleShutdown, startServer, stopServer } from "./app/server";
import { env } from "./utils/env";


startServer(app, env.port).catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});


process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);