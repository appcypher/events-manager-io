import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import router from './routes/router';

// Set up the express app
const app = express();

// Load config files
dotenv.config();
console.log(process.env.SECRET_KEY);

// Port to listen from should be determined by evironment and defaults to 3000
const port = process.env.PORT || 3000;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set template folder
// This must be before setting the router
app.use('/', express.static(path.join(__dirname, '/../../template')));

// Set router
app.use('/', router);

// Open port and listen from it
app.listen(port, () => { console.log(`Listening on port ${port}!`); });

export default app;
