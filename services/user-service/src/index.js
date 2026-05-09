const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'user-service', status: 'healthy', timestamp: new Date() });
});

// Sample: User Profiles & Preferences
let mockProfiles = {
  "admin": {
    id: "admin",
    username: "admin_user",
    displayName: "Admin User",
    bio: "Elite fitness enthusiast and system architect.",
    preferences: {
      theme: "light",
      notifications: true,
      units: "metric"
    },
    social: {
      followers: 1240,
      following: 150
    }
  }
};

app.get('/profile/:username', (req, res) => {
  const profile = mockProfiles[req.params.username];
  if (profile) res.json(profile);
  else res.status(404).json({ error: 'Profile not found' });
});

app.put('/preferences', (req, res) => {
  const { theme, notifications, units } = req.body;
  // Mock update
  mockProfiles["admin"].preferences = { theme, notifications, units };
  res.json({ message: 'Preferences updated', preferences: mockProfiles["admin"].preferences });
});

app.post('/follow/:id', (req, res) => {
  res.json({ message: `Successfully followed user ${req.params.id}`, timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.send('Fitness Tracker user-service is running...');
});

app.listen(PORT, () => {
  console.log('user-service listening on port ' + PORT);
});
