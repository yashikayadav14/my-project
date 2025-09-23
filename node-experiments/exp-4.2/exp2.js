const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3001;

app.use(express.json());

const USER = {
    username: 'user1',
    password: 'password123',
};

let accountBalance = 1000;

const SECRET_KEY = 'mysecretkey';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ error: 'Token missing' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username !== USER.username || password !== USER.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: USER.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/balance', authenticateToken, (req, res) => {
    res.json({ balance: accountBalance });
});

app.post('/deposit', authenticateToken, (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

    accountBalance += amount;
    res.json({ balance: accountBalance, message: `${amount} deposited successfully` });
});

app.post('/withdraw', authenticateToken, (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
    if (amount > accountBalance) return res.status(400).json({ error: 'Insufficient balance' });

    accountBalance -= amount;
    res.json({ balance: accountBalance, message: `${amount} withdrawn successfully` });
});

app.listen(PORT, () => {
    console.log(`Banking API running at http://localhost:${PORT}`);
});
