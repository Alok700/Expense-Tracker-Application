# Expense Tracker Application (MERN Stack)

A full-stack **Expense Tracker web application** built using the **MERN stack** that allows users to track, manage, and analyze their daily expenses. The application provides secure authentication, CRUD operations for expenses, and a clean, responsive user interface.

---

## 🚀 Tech Stack

### Frontend
- React.js
- JavaScript
- CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## ✨ Features

### 👤 User Features
- User registration and login
- Add new expenses
- Edit existing expenses
- Delete expenses
- View expense history
- Secure authentication using JWT

### ⚙️ General Features
- RESTful API architecture
- MongoDB database integration
- Middleware-based authentication
- Environment variable security
- Clean and maintainable code structure

---

## 📁 Project Structure

EXPENSE-TRACKER/
│
├── backend/
│ ├── Controllers/
│ ├── Middlewares/
│ ├── Models/
│ ├── Routes/
│ ├── index.js
│ ├── package.json
│ ├── package-lock.json
│ ├── vercel.json
│ └── .env (ignored)
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── package.json
│ ├── package-lock.json
│ ├── vercel.json
│ └── .env (ignored)
│
├── .gitignore
└── README.md


---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Alok700/Expense-Tracker-Application.git
cd Expense-Tracker-Application

2️⃣ Backend Setup
cd backend
npm install
npm run dev

Create a .env file inside the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

3️⃣ Frontend Setup
cd frontend
npm install
npm start

🌐 Environment Variables

Environment variables are not included in the repository for security reasons.

Backend .env
PORT=
MONGO_URI=
JWT_SECRET=

Frontend .env
REACT_APP_API_URL=


