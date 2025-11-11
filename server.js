
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path = require("path");
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


// ✅ Connect MongoDB
connectDB();

// ✅ API Routes
app.use('/api/auth', authRoutes);

// ✅ Serve React build (static files)
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ For React Router: handle all other routes
// app.get('/', (req, res) => {
//   res.send('Welcome to Panch Shakti Films Studio API 🎬');
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ✅ Server Port

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
