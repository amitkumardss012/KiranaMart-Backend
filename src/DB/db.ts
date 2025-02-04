import mongoose from "mongoose";
import { env } from "../utils/env";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${env.dbUrl}`, {dbName: `${env.dbName}`});
        console.log("Connected to MongoDB" + connection.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1)
    }
};


export default connectDB;