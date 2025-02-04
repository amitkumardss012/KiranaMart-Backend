"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const admin = (0, express_1.Router)();
admin.post("/login", admin_1.adminLogin);
// admin.use(isAdmin)
admin.post("/create", admin_1.createAdmin);
admin.get("/all-admin", admin_1.getAllAdmin);
exports.default = admin;
