import {getUpcomingProjects, getProjectDetails} from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;
const showUpcomingProjectsPage = async(req, res) => {
    const templateView  = 'projects';
    const title = 'UPCOMING SERVICE PROJECTS';
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    //log projects to console in development mode
    if (process.env.NODE_ENV == 'development') {
        console.log(projects);};
    res.render(templateView, {title, projects});
}

const showProjectDetailsPage = async (req, res) => {
    const templateView = 'project';
    const title = 'Project Details';
    const projectId = parseInt(req.params.id);
    const projectDetails = await getProjectDetails(projectId);
    //log projectDetails to console in development mode
    if (process.env.NODE_ENV == 'development') {
        console.log(projectDetails);};

    res.render(templateView, {title, projectDetails});
}

export {showUpcomingProjectsPage, showProjectDetailsPage};