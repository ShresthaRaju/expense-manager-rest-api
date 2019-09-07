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
APIROUTER.post('/category', CategoriesController.addNewCategory);
APIROUTER.get('/category/:id', CategoriesController.getCategory);
APIROUTER.put('/category/:id', CategoriesController.updateCategory);
APIROUTER.delete('/category/:id', CategoriesController.deleteCategory);

// Transaction
APIROUTER.post('/transaction', TransactionsController.newTransaction);
APIROUTER.get('/transaction/:id', TransactionsController.getTransaction);
APIROUTER.put('/transaction/:id', TransactionsController.updateTransaction);
APIROUTER.delete('/transaction/:id', TransactionsController.deleteTransaction);

export default APIROUTER;