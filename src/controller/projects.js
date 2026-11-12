import {getAllProjects} from '../models/projects.js';

const showProjectsPage = async(req, res) => {
    const templateView  = 'projects';
    const title = templateView.toUpperCase();
    const projects = await getAllProjects();
    console.log(projects);
    res.render(templateView, {title, projects});
}

export {showProjectsPage};