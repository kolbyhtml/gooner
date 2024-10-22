// server.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const app = express();

// Session configuration
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));

// Valid keys (in a real application, these should be stored in a database)
const validKeys = new Set([
    'nrat1',
    'nrat'
]);

// Serve the key entry page
app.get('/', (req, res) => {
    // If already authenticated, redirect to main content
    if (req.session.authenticated) {
        res.redirect('/main');
        return;
    }
    res.sendFile(path.join(__dirname, 'public', 'key-entry.html'));
});

// Handle key verification
app.post('/verify-key', (req, res) => {
    const submittedKey = req.body.key;
    
    if (validKeys.has(submittedKey)) {
        req.session.authenticated = true;
        res.redirect('/main');
    } else {
        res.redirect('/?error=invalid');
    }
});

// Protect main content
app.use('/main', (req, res, next) => {
    if (!req.session.authenticated) {
        res.redirect('/');
        return;
    }
    next();
});

// Serve the main content
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});