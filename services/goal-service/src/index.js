const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5007;

// --- MongoDB Configuration ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/goals', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB (Goals)'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// --- Advanced Mongoose Schemas ---
const GoalSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true, trim: true },
  target: { type: Number, required: true, min: 0 },
  current: { type: Number, default: 0 },
  unit: { type: String, enum: ['kg', 'km', 'lbs', 'miles', 'sessions'], required: true },
  deadline: { type: Date },
  status: { type: String, enum: ['active', 'completed', 'abandoned'], default: 'active' },
  milestones: [{
    label: String,
    value: Number,
    isReached: { type: Boolean, default: false }
  }]
}, { timestamps: true });

// Virtual for progress percentage
GoalSchema.virtual('progress').get(function() {
  return Math.min(Math.round((this.current / this.target) * 100), 100);
});

GoalSchema.set('toJSON', { virtuals: true });

const HabitSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  dailyGoal: { type: Number, default: 1 },
  currentValue: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastLogged: { type: Date }
});

const Goal = mongoose.model('Goal', GoalSchema);
const Habit = mongoose.model('Habit', HabitSchema);

// --- Middleware ---
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'goal-service', status: 'healthy', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// --- High-Performance Queries ---
app.get('/', async (req, res) => {
  try {
    const goals = await Goal.find({ status: 'active' }).limit(10).lean();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/habits', async (req, res) => {
  try {
    const habits = await Habit.find().lean();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/goals', async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/habits/:id/increment', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).send('Habit not found');
    
    habit.currentValue += 1;
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('goal-service listening on port ' + PORT);
});
