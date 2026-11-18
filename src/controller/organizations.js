import {getAllOrganizations, getOrganizationDetails, createOrganization} from '../models/organizations.js';
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
    const organizationId = parseInt(req.params.id);
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);

    //For debugging
    if (NODE_ENV === 'development') {
        console.log(organizationDetails)
        projects.forEach(project => console.log(project));
    };

    const templateView = 'organization';
    const title = 'ORGANIZATION DETAILS';

    res.render(templateView, {title, organizationDetails, projects});
}

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    res.redirect(`/organization/${organizationId}`);
};

export {showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm};