import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

import authRoutes from './routes/authRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import genreRoutes from './routes/genreRoutes.js';


mongoose.connect(process.env.MONGODB_URI as string)
.then(() => {
    console.log("Database connected successfully")
})
.catch((error) => {
    console.error("Error connecting to database:", error)
})


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', authorRoutes);
app.use('/api', bookRoutes);
app.use('/api', genreRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})