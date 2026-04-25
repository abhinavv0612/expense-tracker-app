const express = require('express');
const cors = require('cors');

const expenseRoutes = require('./routes/expense.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running, check for base endpoint. 🚀');
});

app.get('/health', (req, res) => {
  res.send('OK');
});

app.use('/expenses', expenseRoutes);

module.exports = app;