"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./middlewares/error");
const db_1 = __importDefault(require("./DB/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
// Importing routes
const franchise_1 = __importDefault(require("./routes/franchise"));
const admin_1 = __importDefault(require("./routes/admin"));
const ourTeam_1 = __importDefault(require("./routes/ourTeam"));
const env_1 = require("./utils/env");
// All the instances
const app = (0, express_1.default)();
// connect Database
(0, db_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use((0, cors_1.default)({
    origin: [env_1.env.frontendUrl, env_1.env.frontendUrl1],
    credentials: true
}));
// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
        db: process.env.DATABASE_URL
    });
});
app.use("/api/v1/franchise", franchise_1.default);
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/our-team", ourTeam_1.default);
// Error middleware
app.use(error_1.errorMiddleware);
exports.default = app;
