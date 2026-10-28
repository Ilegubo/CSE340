import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path'

//Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
  * Configure Express middleware
  */

// Serve dynamic ejs files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const templateView  = 'home';
    const title = templateView.toUpperCase();
    res.render(templateView, {title});
})
app.get('/organizations', (req, res) => {
    const templateView  = 'organizations';
    const title = templateView.toUpperCase();
    res.render(templateView, {title});
});
app.get('/projects', (req, res) => {
    const templateView  = 'projects';
    const title = templateView.toUpperCase();
    res.render(templateView, {title});
});
app.get('/categories', (req, res) => {
    const templateView = 'categories';
    const title =templateView.toUpperCase;
    res.render(templateView, {title})
})

//set EJS as the templating engine
app.set('view engine', 'ejs');

//Tell Express wehre to find you templates
app.set('views', path.join(__dirname, 'src/views'))

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
})