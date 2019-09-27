import UserCategory from '../models/UserCategory';
import DefaultCategory from '../models/DefaultCategory';
import Validation from '../requests/Validation';
import mongoose from 'mongoose';

class CategoriesController {

    // view default categories
    async getExpenseCategories(request, response) {
        let expenseCategories = await DefaultCategory.find({ type: "Expense" });
        if (!expenseCategories) {
            response.status(204).json({ success: false, message: "No category in expense !" });
        } else {
            response.status(200).json({ success: true, categories: expenseCategories });
        }
    }

    async getIncomeCategories(request, response) {
        let incomeCategories = await DefaultCategory.find({ type: "Income" });
        if (!incomeCategories) {
            response.status(204).json({ success: false, message: "No category in income !" });
        } else {
            response.status(200).json({ success: true, categories: incomeCategories });
        }
    }

    // add a new category
    async addNewCategory(request, response) {
        const result = Validation.ADDCATEGORY(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else if (await UserCategory.existsAlready(result.value.name, result.value.type, result.value.creator)) {
            response.status(409).json({ success: false, error: { field: "name", message: "Category already added!" } });
        } else {
            try {
                let newCategory = new UserCategory(result.value);
                let category = await newCategory.save();
                response.status(201).json({ success: true, message: `Category '${category.name}' added!`, category: category });
            } catch (error) {
                response.status(500).json({ success: false, error: error.message });
            }
        }
    }

    // view user's single category
    async getSingleCategory(request, response) {
        let categoryId = request.params.id;
        let category = await UserCategory.findById(categoryId);
        if (!category) {
            response.status(404).json({ success: false, message: "Category does not exist!" });
        } else {
            response.status(200).json({ success: true, category: category });
        }
    }

    // view user's all categories
    async getUserCategories(request, response) {
        let userId = request.params.userId;
        let userCategories = await UserCategory.find({ creator: userId });
        if (!userCategories) {
            response.status(204).json({ success: false, message: "No category yet!" });
        } else {
            response.status(200).json({ success: true, categories: userCategories });
        }
    }

    // edit and update the existing category
    async updateCategory(request, response) {
        const result = Validation.ADDCATEGORY(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else if (await UserCategory.existsAlready(result.value.name, result.value.type, result.value.creator)) {
            response.status(409).json({ success: false, error: { field: "name", message: "Category already added!" } });
        } else {
            try {
                let categoryId = request.params.id;
                let name = result.value.name;

                let category = await UserCategory.findOneAndUpdate({ _id: categoryId }, { name }, { new: true });
                if (!category) {
                    response.status(404).json({ success: false, message: "Category does not exist!" });
                } else {
                    response.status(201).json({ success: true, message: "Category updated!", updatedCategory: category });
                }
            } catch (error) {
                response.status(500).json({ success: false, error: error.message });
            }
        }
    }

    // delete a category
    async deleteCategory(request, response) {
        try {
            let category = await UserCategory.findOneAndDelete({ _id: request.params.id });
            if (!category) {
                response.status(404).json({ success: false, message: "Category does not exist!" });
            } else {
                response.status(200).json({ success: true, message: `Category '${category.name}' deleted successfully!`, deletedCategory: category });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }
}

export default new CategoriesController();