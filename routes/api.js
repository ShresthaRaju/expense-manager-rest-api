import express from 'express';
import SignUpController from '../controllers/auth/SignUpController';
import SignInController from '../controllers/auth/SignInController';
import CategoryController from '../controllers/CategoryController';

const APIROUTER = express.Router();

// auth requests
APIROUTER.post('/sign-up', SignUpController.registerUser);
APIROUTER.post('/sign-in', SignInController.signIn);

// category
APIROUTER.post('/category', CategoryController.addNewCategory);
APIROUTER.get('/category/:id', CategoryController.getCategory);
APIROUTER.put('/category/:id', CategoryController.updateCategory);
APIROUTER.delete('/category/:id', CategoryController.deleteCategory);

export default APIROUTER;