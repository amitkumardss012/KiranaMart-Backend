import { model, Schema } from "mongoose";
import { AdminType } from "../utils/zod";

const adminSchema = new Schema<AdminType>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Admin = model<AdminType>("Admin", adminSchema);

export default Admin