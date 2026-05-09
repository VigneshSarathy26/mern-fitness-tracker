const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'elite_fitness_secret_2026';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'fitness_sso_session_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// SAML Strategy Configuration
// Note: In production, these should be environment variables from your IdP (e.g., Okta, Auth0, Ping)
passport.use(new SamlStrategy(
  {
    path: '/api/auth/login/saml/callback',
    entryPoint: process.env.SAML_ENTRY_POINT || 'https://mock-idp.example.com/saml2/idp/sso',
    issuer: 'fittrack-saml-sp',
    cert: process.env.SAML_CERT || 'MOCK_CERT_NOT_FOR_PRODUCTION'
  },
  (profile, done) => {
    // In a real app, find or create the user in MongoDB here using profile.email or profile.nameID
    const user = {
      id: profile.nameID || 'saml_user_' + Date.now(),
      email: profile.email || profile.nameID,
      name: profile.displayName || 'SSO User'
    };
    return done(null, user);
  }
));

app.get('/health', (req, res) => {
  res.json({ service: 'auth-service', status: 'healthy', timestamp: new Date() });
});

// SAML Login Initiation
app.get('/login/saml', passport.authenticate('saml', { failureRedirect: '/login', failureFlash: true }));

// SAML Callback URL (ACS)
app.post('/login/saml/callback', 
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  (req, res) => {
    // On successful SAML auth, generate our internal JWT
    const user = req.user;
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: 'elite_member' },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '24h' }
    );
    
    // Redirect back to frontend with the token (in a real app, use a secure cookie or postMessage)
    res.redirect(`http://localhost/?token=${token}`);
  }
);

// Standard Local Login (Mocked fallback)
app.post('/login', (req, res) => {
  const { email } = req.body;
  const token = jwt.sign(
    { userId: 'local_user_' + Date.now(), email, role: 'standard' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.status(200).json({
    status: 'success',
    data: { token, email }
  });
});

app.listen(PORT, () => {
  console.log(`auth-service (SAML-enabled) listening on port ${PORT}`);
});
