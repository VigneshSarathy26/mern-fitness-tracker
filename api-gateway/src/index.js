const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Service Routes Configuration
const services = [
  { path: '/api/auth', target: process.env.AUTH_SERVICE_URL || 'http://localhost:5001' },
  { path: '/api/users', target: process.env.USER_SERVICE_URL || 'http://localhost:5002' },
  { path: '/api/workouts', target: process.env.WORKOUT_SERVICE_URL || 'http://localhost:5003' },
  { path: '/api/nutrition', target: process.env.NUTRITION_SERVICE_URL || 'http://localhost:5004' },
  { path: '/api/analytics', target: process.env.ANALYTICS_SERVICE_URL || 'http://localhost:5005' },
  { path: '/api/goals', target: process.env.GOAL_SERVICE_URL || 'http://localhost:5007' }, // Adjusted port for goal service
];

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running' });
});

// Proxy Middleware Setup
services.forEach(service => {
  app.use(service.path, createProxyMiddleware({
    target: service.target,
    changeOrigin: true,
    pathRewrite: {
      [`^${service.path}`]: '',
    },
  }));
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
