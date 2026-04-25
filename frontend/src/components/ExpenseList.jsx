import { deleteExpense } from "../services/api";

export default function ExpenseList({ data, total, onDelete }) {
  const handleDelete = async (id) => {
    await deleteExpense(id);
    onDelete(); // refresh list
  };

  return (
    <div>
      <div className="total">Total: ₹{total}</div>

      {data.map((exp) => (
        <div className="expense-card" key={exp.id}>
          <div className="top-row">
            <span className="amount">₹{exp.amount}</span>
            <span className="category">{exp.category}</span>
          </div>

          {exp.description && (
            <div className="description">{exp.description}</div>
          )}

          <div className="bottom-row">
            <span className="date">{exp.date}</span>

            <button
              className="delete-btn"
              onClick={() => handleDelete(exp.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}