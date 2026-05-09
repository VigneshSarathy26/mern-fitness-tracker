const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'notification-service', status: 'healthy', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.send('Fitness Tracker notification-service is running...');
});

app.listen(PORT, () => {
  console.log('notification-service listening on port ' + PORT);
});
