// Load environment variables
import dotenv from 'dotenv'; 
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import riderRoutes from './routes/riderRoutes.js';


const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// MongoDB connection. 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rider', riderRoutes);
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
