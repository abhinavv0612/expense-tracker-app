const BASE_URL = "http://localhost:5000";

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
    ? `http://localhost:5000/expenses?${queryParams.toString()}`
    : `http://localhost:5000/expenses`;

  const res = await fetch(url);
  return res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(`http://localhost:5000/expenses/${id}`, {
    method: "DELETE",
  });

  return res.json();
};