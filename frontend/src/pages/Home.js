import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);

  const navigate = useNavigate();

  // ✅ Get logged in user
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser') || '');
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => navigate('/login'), 1000);
  };

  // ✅ Fetch expenses from backend
  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetch(`${APIUrl}/expenses`, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const result = await response.json();
      setExpenses(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      handleError(err);
    }
  }, [navigate]);

  // ✅ Calculate total income & expenses
  useEffect(() => {
    if (!Array.isArray(expenses)) return;

    let income = 0;
    let expense = 0;

    expenses.forEach((item) => {
      const amt = Number(item.amount) || 0;
      if (amt > 0) income += amt;
      else expense += Math.abs(amt);
    });

    setIncomeAmt(income);
    setExpenseAmt(expense);
  }, [expenses]);

  // ✅ Add new transaction
  const addExpense = async (data) => {
    try {
      const response = await fetch(`${APIUrl}/expenses`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const result = await response.json();
      handleSuccess(result?.message);
      await fetchExpenses(); // ✅ Re-fetch updated list
    } catch (err) {
      handleError(err);
    }
  };

  // ✅ Delete expense
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${APIUrl}/expenses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('token') },
      });

      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const result = await response.json();
      handleSuccess(result?.message);
      await fetchExpenses(); // ✅ Re-fetch after delete
    } catch (err) {
      handleError(err);
    }
  };

  // ✅ Fetch expenses on first render
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div>
      <div className="user-section">
        <h1>Welcome {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />

      <ExpenseForm addExpense={addExpense} />

      <ExpenseTable expenses={expenses} deleteExpense={deleteExpense} />

      <ToastContainer />
    </div>
  );
}

export default Home;
