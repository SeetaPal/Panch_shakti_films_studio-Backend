

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Panch Shakti Films Studio API 🎬');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
