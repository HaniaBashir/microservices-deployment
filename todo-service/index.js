const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const SECRET = process.env.JWT_SECRET || 'change_me';
let todos = [];

// Auth middleware
app.use((req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.split(' ')[1];
  if (!token) return res.status(401).send();
  try { jwt.verify(token, SECRET); next(); } catch { res.status(403).end(); }
});

app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  todos.push(req.body);
  res.status(201).end();
});

app.listen(5000, () => console.log('Todo service on 5000'));