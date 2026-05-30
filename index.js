require('dotenv').config();
const express = require('express');
const path    = require('path');
const routes  = require('./src/routes/index');
const authRoutes = require('./src/routes/auth');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ status: 'success', message: '🎬 Chill Streaming API is running', version: '2.0.0' });
});

app.use('/api', routes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: `Route ${req.originalUrl} tidak ditemukan` });
});

app.listen(PORT, () => {
  console.log(`\n🎬 Chill API berjalan di http://localhost:${PORT}\n`);
});

module.exports = app;
