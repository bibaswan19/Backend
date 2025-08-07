const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectToDatabase = require('./utils/db'); // ✅ Fix import
const notificationRoutes = require('./routes/notifications');
const studyMaterialRoutes = require('./routes/studyMaterials');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);
app.use('/api/study-materials', studyMaterialRoutes);

// ✅ Only ONE app.listen()
connectToDatabase()
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
