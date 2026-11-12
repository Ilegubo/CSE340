import express from 'express';

import {showHomePage} from './controller/index.js';
import {showOrganizationsPage} from './controller/organizations.js'
import { showCategoriesPage } from './controller/cateogories.js';
import { showProjectsPage } from './controller/projects.js';
import { showTestErrorPage } from './controller/errors.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/categories', showCategoriesPage);
router.get('/projects', showProjectsPage);
router.get('/test-error', showTestErrorPage);

export default router;