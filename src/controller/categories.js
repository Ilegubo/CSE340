import { getAllCategories, getProjectsByCategoryId } from "../models/categories.js";


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
    const title = 'CATEGORY DETAILS';
    const categoryId = parseInt(req.params.id);
    const categoryDetails = await getProjectsByCategoryId(categoryId);

    if (process.env.NODE_ENV == 'development') {
        console.log(categoryDetails);
    }

    res.render(templateView, {title, categoryDetails});
};

export {showCategoriesPage, showCategoryDetailsPage};