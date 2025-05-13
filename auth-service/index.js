const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const SECRET = process.env.JWT_SECRET || 'change_me';

// Simple in-memory user
const users = [{ id: 1, username: 'user', password: 'pass' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username===username && u.password===password);
  if (!user) return res.status(401).json({ error: 'Invalid creds' });
  const token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(4000, () => console.log('Auth service on 4000'));