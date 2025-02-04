"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleShutdown = exports.stopServer = exports.startServer = void 0;
let isRunning = false;
const startServer = (app, port) => {
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
exports.startServer = startServer;
const stopServer = () => {
    return new Promise((resolve, reject) => {
        if (!isRunning) {
            resolve();
            return;
        }
        try {
            console.log('Shutting down the server...');
            isRunning = false;
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.stopServer = stopServer;
const handleShutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received termination signal. Stopping the server...');
    try {
        yield (0, exports.stopServer)();
        console.log('Server stopped successfully.');
    }
    catch (err) {
        console.error('Error during shutdown:', err);
    }
    finally {
        process.exit(0);
    }
});
exports.handleShutdown = handleShutdown;
