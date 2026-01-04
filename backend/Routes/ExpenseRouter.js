// const express = require('express');
// const { getAllTransactions, addTransaction, deleteTransaction }
//     = require('../Controllers/ExpenseController');
// const router = express.Router();

// router.get('/', getAllTransactions);
// router.post('/', addTransaction);
// router.delete('/:expenseId', deleteTransaction);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { fetchExpenses, addExpenses, deleteExpenses } = require('../controllers/ExpenseController');

// GET all expenses
router.get('/', fetchExpenses);

// POST a new expense
router.post('/', addExpenses);

// DELETE an expense by id
router.delete('/:expenseId', deleteExpenses);

module.exports = router;
