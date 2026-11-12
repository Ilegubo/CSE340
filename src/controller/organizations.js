import {getAllOrganizations} from '../models/organizations.js';

const showOrganizationsPage = async(req, res) => {
    const organizations = await getAllOrganizations();
    console.log(organizations);
    
    const templateView  = 'organizations';
    const title = templateView.toUpperCase();
    res.render(templateView, {title, organizations});
};

export {showOrganizationsPage};