const express = require('express');
const app = express();
const PORT = 3002;

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

    const token = authHeader.split(' ')[1]; // Bearer mysecrettoken
    if (!token) return res.status(401).json({ error: 'Bearer token missing' });

    if (token !== 'mysecrettoken') return res.status(403).json({ error: 'Invalid token' });

    next();
}

app.get('/public', (req, res) => {
    res.json({ message: 'This is a public route, accessible without authentication.' });
});

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted! You have the correct Bearer token.' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
