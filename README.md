# Expense Tracker 

A production-minded expense tracking application built with a focus on **correctness, reliability, and clean system design**.

---

## 🔗 Live Demo

* **Frontend**: https://expense-tracker-app-nu-sooty.vercel.app/
* **Backend API**: https://expense-tracker-app-7cio.onrender.com

---

## 🚀 Features

* Add a new expense (amount, category, description, date)
* View list of expenses
* Filter expenses by category
* Sort expenses (newest / oldest)
* View total of visible expenses
* Delete an expense
* Handles duplicate submissions safely (idempotency)

---

## 🏗️ Tech Stack

### Backend

* Node.js + Express
* In-memory data store (designed for easy DB replacement)
* REST API design

### Frontend

* React (Vite)
* Clean component-based architecture
* Fetch API for communication

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
expense-tracker/
├── backend/
├── frontend/
└── README.md
```

---

## ⚙️ How to Run Locally

### Backend

```
cd backend
npm install
npm run dev
```

Runs on: http://localhost:5000

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Runs on: http://localhost:5173

---

## 🧠 Key Design Decisions

### 1. Idempotency Handling

* Implemented using `Idempotency-Key` header
* Prevents duplicate expense creation during retries
* Same key + same body → same response
* Same key + different body → rejected

### 2. Data Modeling

* Expense modeled with clear structure
* Categories normalized for consistency
* Designed to easily plug into a real database later

### 3. API Design

* RESTful endpoints
* Query-based filtering and sorting
* Aggregated response (`total`, `count`, `data`)

### 4. Frontend Architecture

* Separation of concerns (components, services)
* Centralized API handling
* Controlled forms + loading states

---

## ⚖️ Trade-offs

* **Simplicity over persistence:**
  Used an in-memory data store to prioritize API design, correctness, and faster iteration. The system is structured so a database can be introduced with minimal changes.

* **Correctness over feature breadth:**
  Focused on implementing idempotent APIs and consistent data handling rather than adding multiple features, ensuring reliability in scenarios like request retries.

* **Minimal abstraction for clarity:**
  Kept the architecture lightweight (service + routes) to maintain readability and reduce unnecessary complexity, while still keeping it extensible.

* **Frontend pragmatism:**
  Built a clean, responsive UI without heavy libraries to keep the bundle small and focus on functionality and UX fundamentals.

* **Stateless API design:**
  Designed endpoints to be stateless and predictable, making them easier to scale and integrate with other systems.


---

## 🔮 Improvements (If extended)

* Persistent database (PostgreSQL / MongoDB)
* Pagination for large datasets
* Advance UI (animations, charts)

---

## 📌 Notes

This project was built with a focus on **real-world behavior**, including:

* Handling retries
* Clean API contracts
* Maintainable structure

---

## 👨‍💻 Author

Abhinav Tomar
