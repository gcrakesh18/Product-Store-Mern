// ===============================
// 📦 Core Dependencies
// ===============================
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ===============================
// 📂 Custom Modules
// ===============================
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

// ===============================
// 🌍 Load Environment Variables
// ===============================
dotenv.config();

// ===============================
// 🚀 Initialize Express App
// ===============================
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// ===============================
// 🔐 CORS Configuration
// ===============================
// Allowed frontend origins
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://productstore-five.vercel.app",
    "http://localhost:5173", // Local development frontend
];

// Configure CORS
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like Postman, curl)
            if (!origin) return callback(null, true);

            // Check if origin is allowed
            if (allowedOrigins.includes(origin)) return callback(null, true);

            // Reject other origins
            return callback(new Error("CORS not allowed from this origin: " + origin));
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// ===============================
// 🗄 Connect to MongoDB Database
// ===============================
connectDB();

// ===============================
// 📡 API Routes
// ===============================
app.use('/api/products', productRoutes);

// ===============================
// 🧪 Default Route (Health Check)
// ===============================
app.get('/', (req, res) => {
    res.send('✅ API is running and connected to MongoDB successfully.');
});

// ===============================
// ▶ Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `✅ Server running on port ${PORT} in ${
            process.env.NODE_ENV || 'development'
        } mode`
    );
});