import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Enable CORS for frontend
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'], credentials: true }));

// Setup Express Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB (Fixed)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Ensure connection timeout handling
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Tour Schema
const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  museum: String,
  ageGroup: String,
  englishLevel: String,
  theme: String,
  duration: String,
  additionalRequirements: String,
  createdAt: { type: Date, default: Date.now }
});

const Tour = mongoose.model('Tour', tourSchema);

// API Route: Fetch All Tours
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tours" });
  }
});

// API Route: Create a New Tour with Auto-Generated Title
app.post('/api/tours', async (req, res) => {
  try {
    const { museum, ageGroup, englishLevel, theme, duration, additionalRequirements } = req.body;
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Count existing tours with the same museum and date
    const existingTours = await Tour.find({ museum, createdAt: { $gte: new Date(currentDate) } });
    const tourCount = existingTours.length;
    
    // Generate title
    let title = `${museum} - ${currentDate}`;
    if (tourCount > 0) {
      title += ` (${tourCount})`;
    }
    
    const newTour = new Tour({ title, museum, ageGroup, englishLevel, theme, duration, additionalRequirements });
    await newTour.save();
    res.status(201).json({ message: "Tour created successfully", tour: newTour });
  } catch (error) {
    res.status(500).json({ error: "Failed to create tour" });
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_REDIRECT_URL || 'http://localhost:5173/homepage');
  }
);

app.get('/auth/user', (req, res) => {
  res.send(req.user || null);
});

// Logout Route
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

