// backend/src/server.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Подключение к MongoDB
connectDB()

// Определяем схему и модель поста
interface IPost {
  title: string;
  content: string;
}

const postSchema = new mongoose.Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Post = mongoose.model<IPost>('Post', postSchema);



// Эндпоинт для создания нового поста
app.post('/api/posts', async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
