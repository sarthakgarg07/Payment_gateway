require('dotenv').config(); // Load environment variables

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

// Debug environment variables
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user); // Save the user object to the session
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user); // Retrieve the user object from the session
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback' // Ensure this matches the URI in Google Cloud Console
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile); // Pass the user profile to serializeUser
}));

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:3001/homepage'); // Redirect to frontend homepage after login
});

module.exports = router;