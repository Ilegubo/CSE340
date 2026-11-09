import os from 'os';
import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import {getAllProjects} from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';


//Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
  * Configure Express middleware
  */

// Serve dynamic ejs files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

//Home page
app.get('/', async (req, res) => {
    const templateView  = 'home';
    const title = templateView.toUpperCase();
    res.render(templateView, {title});
})
// Organizations page
app.get('/organizations', async(req, res) => {
    const organizations = await getAllOrganizations();
    console.log(organizations);
    
    const templateView  = 'organizations';
    const title = templateView.toUpperCase();
    res.render(templateView, {title, organizations});  
});
// Projects Page
app.get('/projects', async (req, res) => {
    const templateView  = 'projects';
    const title = templateView.toUpperCase();
    const projects = await getAllProjects();
    console.log(projects);
    res.render(templateView, {title, projects});
});
// Categories Page
app.get('/categories', async (req, res) => {
    const templateView = 'categories';
    const title =templateView.toUpperCase();
    const categories = await getAllCategories();
    console.log(categories);
    res.render(templateView, {title, categories});
})

//set EJS as the templating engine
app.set('view engine', 'ejs');

//Tell Express wehre to find you templates
app.set('views', path.join(__dirname, 'src/views'))

/*app.listen(PORT, async () => {
  process.stdout.write('\x1b[2J\x1b[3J\x1b[H');

  try {
  
    await testConnection();
    console.log('='.repeat(42));
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log('='.repeat(42));

  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});*/


app.listen(PORT, HOST, async () => {
  process.stdout.write('\x1b[2J\x1b[3J\x1b[H');

  try {
    await testConnection();

    
    const localIP = Object.values(os.networkInterfaces())
      .flat()
      .find(i => (i.family === 'IPv4' || i.family === 4) && !i.internal)?.address;
      

    console.log('='.repeat(42));
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Server is running at http://${localIP}:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log('='.repeat(42));

  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
