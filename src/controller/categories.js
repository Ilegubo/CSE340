import { getAllCategories } from "../models/categories.js";
import { getProjectsByCategoryId } from "../models/projects.js";


const showCategoriesPage = async (req, res) => {
    const templateView = 'categories';
    const title =templateView.toUpperCase();
    const categories = await getAllCategories();
    if (process.env.NODE_ENV == 'development') {
        console.log(categories);
    };
    res.render(templateView, {title, categories});
};

const showCategoryDetailsPage = async (req, res) => {
    const templateView = 'category';
    const categoryId = parseInt(req.params.id);
    const categoryDetails = await getProjectsByCategoryId(categoryId);
    const title = `CATEGORY DETAILS`;
    
    if (process.env.NODE_ENV == 'development') {
        console.log(categoryDetails);
    }

    res.render(templateView, {title, categoryDetails});
};

export {showCategoriesPage, showCategoryDetailsPage};