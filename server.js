import os from 'os';
import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';

import router from './src/routes.js';


//Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* Cofigure Express Middleware */
// Serve dynamic ejs files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs'); //set EJS as the templating engine
app.set('views', path.join(__dirname, 'src/views')) //tell express where to find the EJS  files

// middleware to log all incoming requests
app.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log(`Request method => ${req.method} | RequestURL => ${req.url}`);
  }
  next(); //Pass control to the next middleware or route
})

// middlware to make NODE_ENV available to all templates;
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
  }
)

app.use(router);

// Test route for 500 errors

//Catch all route 404 errors
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
})
//Global error handler
app.use ((err, req, res, next) => {
  //Log error details for debugging
  console.error('Eror occurred:', err.messages);
  console.error('Stack trace:', err.stack);

  //Determine & set status and template
  const status = err.status || 500;
  const template = status === 404 ? '404' : '500';

  //Prepare data for the template
  const context = {
    title: status === 404 ? 'Page Not Found' : 'Server',
    message: err.messgae,
    stack: err.stack
  };
  // render the appropriate template
  res.status(status).render(`errors/${template}`, context)
});


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
