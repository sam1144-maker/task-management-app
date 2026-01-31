import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({limit: '16kb'}));    
app.use(cors({
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});