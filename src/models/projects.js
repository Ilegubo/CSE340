import db from './db.js';

const getAllProjects = async() => {
    const query = 'SELECT title, description, location, date FROM public.projects';
    const result =  await db.query(query);

    return result.rows;
}

export {getAllProjects};