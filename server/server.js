import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
// import router from './routes/router';

// Set up the express app
const app = express();

// Port to listen from should be determined by evironment and defaults to 3000
const port = process.env.PORT || 3000;

// Key for authenticating user sessions
process.env.SECRET_KEY = 'OX8b79Ie89Fd6sh5ysg1JR93d8tR5E892j7Yi0';

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // Set router for path
// app.use('/', router);
// Test route
app.get('/api/v1/test', (req, res) => {
  res.send({
    message: 'This is sparta',
  });
});

// Set template folder
app.use(express.static(path.join(__dirname, '/template')));

// Open port and listen from it
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

export default app;
