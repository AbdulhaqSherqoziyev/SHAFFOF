const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

// .env faylini yuklash
dotenv.config();

// Express appini yaratish
const app = express();

// CORSni faollashtirish
app.use(cors());

// Body parser (json)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);

// Static fayllar (video fayllari)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB bilan ulanish
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Serverni ishga tushurish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
