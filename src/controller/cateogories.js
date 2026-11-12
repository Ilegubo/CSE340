import { getAllCategories } from "../models/categories.js";


const showCategoriesPage = async (req, res) => {
    const templateView = 'categories';
    const title =templateView.toUpperCase();
    const categories = await getAllCategories();
    console.log(categories);
    res.render(templateView, {title, categories});
}

export {showCategoriesPage};