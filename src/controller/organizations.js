import {getAllOrganizations, getOrganizationDetails, createOrganization} from '../models/organizations.js';
import {getProjectsByOrganizationId} from '../models/projects.js';
import {body, validationResult} from 'express-validator';

const NODE_ENV = process.env.NODE_ENV?.toLocaleLowerCase() || 'production';

const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),
    body('contactEmail')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
];

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
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new organization form
        return res.redirect('/new-organization');
    }

    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);

    // Set a success flash message
    req.flash('success', 'Organization added successfully!');

    res.redirect(`/organization/${organizationId}`);
};

export {showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation};