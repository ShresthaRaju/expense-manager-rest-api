import Category from '../models/Category';
import Validation from '../requests/Validation';

class CategoriesController {

    // add a new category
    async addNewCategory(request, response) {
        const result = Validation.ADDCATEGORY(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else if (await Category.existsAlready(result.value.name, result.value.type, result.value.creator)) {
            response.status(409).json({ success: false, error: { field: "name", message: "Category already added!" } });
        } else {
            try {
                let newCategory = new Category(result.value);
                let category = await newCategory.save();
                response.status(201).json({ success: true, message: `Category ${category.name} added!`, category: category });
            } catch (error) {
                response.status(500).json({ success: false, error: error.message });
            }
        }
    }

    // view a category
    async getCategory(request, response) {
        let category = await Category.findById(request.params.id);
        if (!category) {
            response.status(404).json({ success: false, message: "Category does not exist!" });
        } else {
            response.status(201).json({ success: true, category: category });
        }
    }

    // view all categories
    async getAllCategories(request, response) {
        let categories = await Category.find();
        if (!categories) {
            response.status(404).json({ success: false, message: "No category !" });
        } else {
            response.status(201).json({ success: true, categories: categories });
        }
    }

    // edit and update the existing category
    async updateCategory(request, response) {
        const result = Validation.ADDCATEGORY(request.body);

        if (result.error) {
            let error = result.error.details[0];
            response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } });
        } else if (await Category.existsAlready(result.value.name, result.value.type, result.value.creator)) {
            response.status(409).json({ success: false, error: { field: "name", message: "Category already added!" } });
        } else {
            try {
                let categoryId = request.params.id;
                let name = result.value.name;

                let category = await Category.findOneAndUpdate({ _id: categoryId }, { name }, { new: true });
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
            let category = await Category.findOneAndDelete({ _id: request.params.id });
            if (!category) {
                response.status(404).json({ success: false, message: "Category does not exist!" });
            } else {
                response.status(201).json({ success: true, message: `Category ${category.name} deleted successfully!`, deletedCategory: category });
            }
        } catch (error) {
            response.status(500).json({ success: false, error: error.message });
        }
    }
}

export default new CategoriesController();