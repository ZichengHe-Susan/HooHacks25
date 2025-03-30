import express, { json } from 'express';
import dotenv from 'dotenv';
import openaiHandler from './server/routes/AIHandler.js';
import process from 'process';
import 'dotenv/config';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5000', 'http://localhost:5001'],
  credentials: true
}));

// app.use(express.json());
app.use(express.json());
app.use('/api', openaiHandler);
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5001 // Ensure connection timeout handling
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


  const tourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    museum: String,
    ageGroup: String,
    englishLevel: String,
    theme: String,
    duration: String,
    additionalRequirements: String,
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true }
  });

  const Tour = mongoose.model('Tour', tourSchema);

// API Route: Fetch All Tours
app.get('/api/tours', async (req, res) => {
  try {
    const userId = req.query.user; // Get user ID from frontend request
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const tours = await Tour.find({ userId }); // Fetch only user's tours
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tours" });
  }
});

app.post('/api/tours', async (req, res) => {
  try {
      const { museum, ageGroup, englishLevel, theme, duration, additionalRequirements, userId } = req.body;
      const currentDate = new Date().toISOString().split('T')[0];
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
      // Count existing tours with the same museum and date
      const existingTours = await Tour.find({ museum, createdAt: { $gte: new Date(currentDate) } });
      const tourCount = existingTours.length;
      // Generate title
      let title = `${museum} - ${currentDate}`;
      if (tourCount > 0) {
        title += ` (${tourCount})`;
      }

      const newTour = new Tour({ 
          title,
          museum,
          ageGroup,
          englishLevel,
          theme,
          duration,
          additionalRequirements,
          userId
      });

      await newTour.save();
      res.status(201).json({ message: "Tour created successfully", tour: newTour });
  } catch (error) {
      res.status(500).json({ error: "Failed to create tour" });
  }
});

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

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_REDIRECT_URL || 'http://localhost:5174/homepage');
  }
);

app.get('/auth/user', (req, res) => {
  res.send(req.user || null);
});

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});
