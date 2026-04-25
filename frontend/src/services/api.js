const BASE_URL = "https://expense-tracker-app-7cio.onrender.com";

export const createExpense = async (data) => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getExpenses = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.category && params.category.trim() !== "") {
    queryParams.append("category", params.category);
  }

  if (params.sort && params.sort.trim() !== "") {
    queryParams.append("sort", params.sort);
  }

  const url = queryParams.toString()
    ? `https://expense-tracker-app-7cio.onrender.com/expenses?${queryParams.toString()}`
    : `https://expense-tracker-app-7cio.onrender.com/expenses`;

  const res = await fetch(url);
  return res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(`https://expense-tracker-app-7cio.onrender.com/expenses/${id}`, {
    method: "DELETE",
  });

  return res.json();
};