// backend/src/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

// Подключение к MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://cluster0.gyqz4.mongodb.net/Testfordeploy`, {
      user: dbUser,
      pass: dbPass,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
