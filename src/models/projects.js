import db from './db.js';

const getAllProjects = async() => {
    const query = `SELECT project_id, organization_id, title,   description, location, date
            FROM public.projects;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getUpcomingProjects = async(numberOfProjects = 5) => {
    const query = `SELECT projects.title, projects.description, projects.location, TO_CHAR(date, 'Dy DD Mon YYYY') AS date, projects.project_id, organization.name AS organization_name, projects.organization_id
    FROM projects
    JOIN organization
    ON organization.organization_id = projects.organization_id
    WHERE date > CURRENT_DATE
    ORDER BY date ASC
    LIMIT $1`;
    const result =  await db.query(query, [numberOfProjects]);

    return result.rows;
};

const getProjectsByOrganizationId = async(organizationId) => {
    const query = `
    SELECT projects.title, projects.description, projects.location, TO_CHAR(date, 'Dy DD Mon YYYY') AS date, categories.name AS category, projects.project_id
    FROM projects JOIN project_categories ON projects.project_id = project_categories.project_id
	JOIN categories ON project_categories.category_id = categories.category_id
    WHERE organization_id = $1`;

    const result = await db.query(query, [organizationId]);

    return result.rows;
};

const getProjectDetails = async(projectId) => {
    const query = `
    SELECT projects.project_id, projects.organization_id, projects.title, projects.description, projects.location, TO_CHAR(date, 'Dy DD Mon YYYY') AS date,
    categories.name AS category, organization.name AS organization_name
    FROM projects JOIN project_categories ON projects.project_id = project_categories.project_id
	JOIN categories ON project_categories.category_id = categories.category_id
	JOIN organization ON projects.organization_id = organization.organization_id
    WHERE projects.project_id = $1`;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

export {getAllProjects, getUpcomingProjects, getProjectsByOrganizationId, getProjectDetails};