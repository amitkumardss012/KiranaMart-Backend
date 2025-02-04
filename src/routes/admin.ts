import { Router } from "express";
import { adminLogin, createAdmin, getAllAdmin } from "../controllers/admin";
import isAdmin from "../middlewares/admin";

const admin = Router();

admin.post("/login", adminLogin)

// admin.use(isAdmin)

admin.post("/create", createAdmin)
admin.get("/all-admin", getAllAdmin)

export default admin;