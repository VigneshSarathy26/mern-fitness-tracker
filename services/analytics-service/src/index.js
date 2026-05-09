const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

// --- Redis Configuration ---
const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000)
});

redis.on('connect', () => console.log('✅ Connected to Redis Cluster'));
redis.on('error', (err) => console.error('❌ Redis Error:', err));

// --- MongoDB Configuration ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/analytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB (Analytics)'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// --- MongoDB Models (Demonstrating Indexes & Subdocs) ---
const ReportSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  period: { type: String, required: true },
  data: {
    totalWorkouts: Number,
    totalCalories: Number,
    avgHeartRate: Number,
    metrics: [new mongoose.Schema({
      key: String,
      value: Number,
      timestamp: { type: Date, default: Date.now }
    }, { _id: false })]
  },
  generatedAt: { type: Date, default: Date.now, expires: 604800 } // TTL Index: Auto-delete after 7 days
});

ReportSchema.index({ userId: 1, period: 1 }, { unique: true });

const Report = mongoose.model('Report', ReportSchema);

// --- Middleware ---
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'analytics-service', status: 'healthy', redis: redis.status });
});

// --- High-Performance Cached Route ---
app.get('/reports/weekly/:userId', async (req, res) => {
  const { userId } = req.params;
  const cacheKey = `report:weekly:${userId}`;

  try {
    // 1. Try to fetch from Redis
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log('🚀 Serving from Redis Cache');
      return res.json({ ...JSON.parse(cachedData), source: 'cache' });
    }

    // 2. If not in cache, fetch from MongoDB
    console.log('💾 Fetching from MongoDB');
    let report = await Report.findOne({ userId, period: "2026-W18" });

    // 3. If not in DB, generate "expensive" report
    if (!report) {
      console.log('⚡ Generating new report (Expensive Operation)');
      report = new Report({
        userId,
        period: "2026-W18",
        data: {
          totalWorkouts: Math.floor(Math.random() * 10),
          totalCalories: Math.floor(Math.random() * 5000),
          avgHeartRate: 72 + Math.floor(Math.random() * 10),
          metrics: [{ key: 'intensity', value: 85 }]
        }
      });
      await report.save();
    }

    // 4. Save to Redis with Expiry (TTL: 1 Hour)
    await redis.set(cacheKey, JSON.stringify(report), 'EX', 3600);

    res.json({ ...report.toObject(), source: 'database' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/insights', (req, res) => {
  res.json({
    recommendation: "Increase Zone 2 cardio duration by 15% to optimize metabolic flux.",
    predictedNextMilestone: "Weight Target Reachable in 14 days"
  });
});

app.get('/', (req, res) => {
  res.send('Fitness Tracker analytics-service is running...');
});

app.listen(PORT, () => {
  console.log('analytics-service listening on port ' + PORT);
});
