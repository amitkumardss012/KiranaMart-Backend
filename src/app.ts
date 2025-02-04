import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error";
import connectDB from "./DB/db";
import coookieParser from "cookie-parser"
import path from "path"


// Importing routes
import franchiseRoute from "./routes/franchise";
import adminRoute from "./routes/admin";
import ourTeam from "./routes/ourTeam";
import { env } from "./utils/env";


// All the instances
const app = express();

// connect Database
connectDB()

// Middlewares
app.use(express.json());
app.use(coookieParser())
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors({
    origin: env.frontendUrl,
    credentials: true
}))

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
        db: process.env.DATABASE_URL
    });
});

app.use("/api/v1/franchise", franchiseRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/our-team", ourTeam);


// Error middleware
app.use(errorMiddleware)

export default app;
