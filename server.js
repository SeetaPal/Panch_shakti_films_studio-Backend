
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path = require("path");
const cors = require('cors');

const modelRoutes = require("./routes/modelRoutes");


const app = express();

// ✅ Proper CORS setup
app.use(cors({
  origin: "http://localhost:5173",  // your React app URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ important
}));


app.use(express.json());
app.use(cors());


// ✅ Connect MongoDB
connectDB();

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use("/api/models", modelRoutes);

// ✅ Serve React build (static files)
app.use(express.static(path.join(__dirname, "../frontend")));



// ✅ Server Port

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
