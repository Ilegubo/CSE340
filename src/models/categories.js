import db from './db.js'

const getAllCategories = async() => {
    const query = `SELECT name, description, category_id FROM categories`;
    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async(categoryId) => {
    const query = `SELECT name from categories WHERE cagories.category = $1;`;
    const queryParam = [categoryId];

    const result = await db.query(query, queryParam);
    return result.row;
};

const getCategoriesByProjectId = async(projectId) => {
    const query = `SELECT name AS category
        FROM projects JOIN project_categories
        ON projects.project_id = project_categories.project_id
        JOIN categories ON project_categories.category_id = categories.category_id
        ORDER BY projects.project_id ASC
        WHERE projects.project_id = $1;`;
    
    const queryParam = [projectId];
    result = await db.query(query, queryParam);

    return result.rows;
};

export {getAllCategories, getCategoryById, getCategoriesByProjectId};