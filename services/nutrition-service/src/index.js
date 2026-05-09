const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'nutrition-service', status: 'healthy', timestamp: new Date() });
});

// Sample: Meal Tracking & Calorie Calculation
let mealLogs = [];

app.post('/meals', (req, res) => {
  const { name, calories, protein, carbs, fats } = req.body;
  const meal = { id: Date.now(), name, calories, protein, carbs, fats, timestamp: new Date() };
  mealLogs.push(meal);
  res.status(201).json({ message: 'Meal logged', meal });
});

app.get('/today', (req, res) => {
  const totals = mealLogs.reduce((acc, curr) => ({
    calories: acc.calories + curr.calories,
    protein: acc.protein + curr.protein,
    carbs: acc.carbs + curr.carbs,
    fats: acc.fats + curr.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  
  res.json({ totals, history: mealLogs });
});

app.get('/', (req, res) => {
  res.send('Fitness Tracker nutrition-service is running...');
});

app.listen(PORT, () => {
  console.log('nutrition-service listening on port ' + PORT);
});
