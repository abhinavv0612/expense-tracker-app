import { useState } from "react";
import { createExpense } from "../services/api";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.category || !form.date) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await createExpense({
        ...form,
        amount: Number(form.amount),
      });

      // refresh list
      onAdd();

      // reset form
      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

<input
  type="text"
  name="category"
  placeholder="Category (e.g. food, travel)"
  value={form.category}
  onChange={handleChange}
  required
/>

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}