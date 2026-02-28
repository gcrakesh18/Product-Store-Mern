import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());

// ✅ Setup CORS properly
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://productstore-five.vercel.app",
    "http://localhost:5173", // for local development
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like Postman, curl)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error("CORS not allowed from this origin: " + origin));
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/products', productRoutes);

// Default route (for testing)
app.get('/', (req, res) => {
    res.send('✅ API is running and connected to MongoDB successfully.');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
