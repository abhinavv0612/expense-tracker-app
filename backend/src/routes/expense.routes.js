const express = require('express');
const router = express.Router();
const expenseService = require('../services/expense.service');
const { idempotencyStore } = require('../utils/db');

router.post('/', (req, res) => {
  const key = req.header('Idempotency-Key');

  // 🔴 Enforce key (good signal)
  if (!key) {
    return res.status(400).json({ message: 'Idempotency-Key header is required' });
  }

  // ✅ If request already processed → return same response
  if (idempotencyStore.has(key)) {
    return res.status(200).json(idempotencyStore.get(key));
  }

  // ✅ Process normally
  const expense = expenseService.createExpense(req.body);

  // ✅ Store response
  idempotencyStore.set(key, expense);

  return res.status(201).json(expense);
});

router.get('/', (req, res) => {
  const { category, sort } = req.query;

  const expenses = expenseService.getAllExpenses({ category, sort });

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  res.json({
    total,
    count: expenses.length,
    data: expenses,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleted = expenseService.deleteExpense(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json({ message: 'Deleted successfully', data: deleted });
});

module.exports = router;