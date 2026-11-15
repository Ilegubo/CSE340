import express from 'express';

import {showHomePage} from './controller/index.js';
import {showOrganizationDetailsPage, showOrganizationsPage} from './controller/organizations.js'
import { showCategoriesPage } from './controller/cateogories.js';
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

export default router;