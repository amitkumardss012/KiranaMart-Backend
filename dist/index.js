"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const server_1 = require("./app/server");
const env_1 = require("./utils/env");
(0, server_1.startServer)(app_1.default, env_1.env.port).catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});
process.on('SIGINT', server_1.handleShutdown);
process.on('SIGTERM', server_1.handleShutdown);
