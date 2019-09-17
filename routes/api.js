import express from 'express';
import SignUpController from '../controllers/auth/SignUpController';
import SignInController from '../controllers/auth/SignInController';
import CategoriesController from '../controllers/CategoriesController';
import TransactionsController from '../controllers/TransactionsController';

const APIROUTER = express.Router();

// auth requests
APIROUTER.post('/sign-up', SignUpController.registerUser);
APIROUTER.post('/sign-in', SignInController.signIn);

// category
APIROUTER.post('/categories', CategoriesController.addNewCategory);
APIROUTER.get('/categories', CategoriesController.getAllCategories);
APIROUTER.get('/categories/:id', CategoriesController.getCategory);
APIROUTER.put('/categories/:id', CategoriesController.updateCategory);
APIROUTER.delete('/categories/:id', CategoriesController.deleteCategory);

// Transaction
APIROUTER.post('/transactions', TransactionsController.newTransaction);
APIROUTER.get('/transactions', TransactionsController.getMyTransactions);
APIROUTER.get('/transactions/:id', TransactionsController.getTransaction);
APIROUTER.put('/transactions/:id', TransactionsController.updateTransaction);
APIROUTER.delete('/transactions/:id', TransactionsController.deleteTransaction);

export default APIROUTER;