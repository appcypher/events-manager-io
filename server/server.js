import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/router';

// Set up the express app
const app = express();

// Using cors
app.use(cors('*'));

// Load config files
dotenv.config();

// Port to listen from should be determined by evironment and defaults to 3000
const port = process.env.PORT || 3000;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set public folder for react routes
app.use('/', express.static(path.join(__dirname, '/../client/public')));

// Set router for api endpoints
app.use('/', router);

// Open port and listen from it
app.listen(port, () => { console.log(`Listening on port ${port}!`); });

export default app;
