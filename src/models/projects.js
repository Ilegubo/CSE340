import db from './db.js';

const getAllProjects = async() => {
    const query = `SELECT title, description, location, TO_CHAR(date, 'Dy DD Mon YYYY') AS date FROM public.projects;
`;
    const result =  await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async(organizationId) => {
    const query = `SELECT title, description, location, date
    FROM projects
    WHERE organization_id = $1`;

    const result = await db.query(query, [organizationId]);

    return result.rows;
}

export {getAllProjects, getProjectsByOrganizationId};