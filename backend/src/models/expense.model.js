class Expense {
  constructor({ id, amount, category, description, date, createdAt }) {
    this.id = id;
    this.amount = amount; // keep as number for now (we'll refine later)
    this.category = category;
    this.description = description;
    this.date = date;
    this.createdAt = createdAt;
  }
}

module.exports = Expense;