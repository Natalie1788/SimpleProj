
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.gyqz4.mongodb.net/Testfordeploy`)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));


interface IPost {
  title: string;
  content: string;
}

const postSchema = new mongoose.Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Post = mongoose.model<IPost>('Post', postSchema, "posts");



// endpoints
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


app.get('/api/posts', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
