import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from '../src/routes/authRoutes'; // ✅ adjust the path if needed


const app = express();
dotenv.config();

app.use(cors({
  origin: "http://localhost:8080",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes); // ✅

mongoose
  .connect(process.env.MONGO_URI || '', { dbName: 'your_db_name' })
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.error("MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
