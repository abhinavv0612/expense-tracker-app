const { v4: uuidv4 } = require('uuid');
const Expense = require('../models/expense.model');
const { expenses } = require('../utils/db');

class ExpenseService {
  createExpense(data) {
    const expense = new Expense({
      id: uuidv4(),
      amount: data.amount,
      category: data.category.toLowerCase(), // normalize
      description: data.description,
      date: data.date,
      createdAt: new Date().toISOString(),
    });

    expenses.push(expense);
    return expense;
  }

  getAllExpenses({ category, sort }) {
    let result = [...expenses];

    // 🔥 FIX: handle empty category properly
    if (category && category.trim() !== "") {
      result = result.filter(
        (exp) => exp.category.toLowerCase() === category.toLowerCase()
      );
    }

    // sorting
    if (sort === "date_desc") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (sort === "date_asc") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return result;
  }

  deleteExpense(id) {
  const index = expenses.findIndex((exp) => exp.id === id);

  if (index === -1) {
    return null;
  }

  const deleted = expenses[index];
  expenses.splice(index, 1);
  return deleted;
}

}

module.exports = new ExpenseService();