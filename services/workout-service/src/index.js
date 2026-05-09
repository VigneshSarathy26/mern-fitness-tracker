const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'workout-service', status: 'healthy', timestamp: new Date() });
});

// Sample: Workout Plans & Logging
let workoutPlans = [
  { id: 1, name: "Hyper-Intervals", type: "Cardio", exercises: ["Sprints", "Burpees", "Mountain Climbers"] },
  { id: 2, name: "Leg Day Core", type: "Strength", exercises: ["Squats", "Deadlifts", "Lunges"] }
];

let workoutLogs = [];

app.get('/plans', (req, res) => {
  res.json(workoutPlans);
});

app.post('/log', (req, res) => {
  const { planId, duration, caloriesBurned } = req.body;
  const newLog = { id: Date.now(), planId, duration, caloriesBurned, timestamp: new Date() };
  workoutLogs.push(newLog);
  res.status(201).json({ message: 'Workout logged successfully', log: newLog });
});

app.get('/history', (req, res) => {
  res.json(workoutLogs);
});

app.get('/', (req, res) => {
  res.send('Fitness Tracker workout-service is running...');
});

app.listen(PORT, () => {
  console.log('workout-service listening on port ' + PORT);
});
