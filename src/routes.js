import express from 'express';

import {showHomePage} from './controller/index.js';
import {showOrganizationDetailsPage, showOrganizationsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation} from './controller/organizations.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controller/categories.js';
import { showUpcomingProjectsPage, showProjectDetailsPage } from './controller/projects.js';
import { showTestErrorPage } from './controller/errors.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/categories', showCategoriesPage);
router.get('/projects', showUpcomingProjectsPage);
router.get('/test-error', showTestErrorPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization',organizationValidation, processNewOrganizationForm);
export default router;