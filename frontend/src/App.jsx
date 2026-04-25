import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { getExpenses } from "./services/api";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

const fetchExpenses = async () => {
  try {
    setLoading(true);

const res = await getExpenses({
  category,
  sort,
});

   setExpenses(res.data || []);
setTotal(res.total || 0);

// 👇 extract unique categories
const uniqueCategories = [
  ...new Set((res.data || []).map((e) => e.category)),
];

setCategories(uniqueCategories);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchExpenses();
}, [category, sort]);

const handleAddExpense = async () => {
  // reset filters
  setCategory("");
  setSort("");

  // fetch all expenses again
  await fetchExpenses();
};

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

<div className="card">
  <ExpenseForm onAdd={handleAddExpense} />
</div>

<div className="controls">
  <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">All Categories</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </option>
  ))}
</select>

  <select value={sort} onChange={(e) => setSort(e.target.value)}>
    <option value="">Sort by</option>
    <option value="date_desc">Newest</option>
    <option value="date_asc">Oldest</option>
  </select>
</div>

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
<p className="empty">No expenses yet. Start adding one 🚀</p>      ) : (
        <ExpenseList data={expenses} total={total} onDelete={fetchExpenses} />
      )}
    </div>
  );
}