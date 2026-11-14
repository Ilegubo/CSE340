import {getAllOrganizations, getOrganizationDetails} from '../models/organizations.js';
import {getProjectsByOrganizationId} from '../models/projects.js';

const NODE_ENV = process.env.NODE_ENV?.toLocaleLowerCase() || 'production';

const showOrganizationsPage = async(req, res) => {
    const organizations = await getAllOrganizations();
    // console.log(organizations);
    
    const templateView  = 'organizations';
    const title = templateView.toUpperCase();
    res.render(templateView, {title, organizations});
};

const showOrganizationDetailsPage = async(req, res) => {
    const organizationId = 1//parseInt(req.params.id);
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId)

    //For debugging
    if (NODE_ENV === 'development') {
        console.log(organizationDetails)
        projects.forEach(project => console.log(project));
    }

    const templateView = 'organization';
    const title = 'Organization Details';

    res.render(templateView, {title, organizationDetails, projects});
}

export {showOrganizationsPage, showOrganizationDetailsPage};