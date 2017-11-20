# Events Manager
![stability wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg "stability wip")
![hound](https://camo.githubusercontent.com/23ee7a697b291798079e258bbc25434c4fac4f8b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50726f7465637465645f62792d486f756e642d6138373364312e737667 "hound")
![travis](https://travis-ci.org/AppCypher/eventsmanager.svg?branch=develop "travis")
[![coverall](https://coveralls.io/repos/github/AppCypher/HelloBooks/badge.svg?branch=develop)](https://coveralls.io/github/AppCypher/eventsmanager?branch=develop)
[![codeclimate](https://codeclimate.org/repos/github/AppCypher/HelloBooks/badge.svg?branch=develop)](https://codeclimate.org/github/AppCypher/eventsmanager?branch=develop)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

![eventsmanager screenshot](https://github.com/AppCypher/EventsManager/blob/api-test/template/images/screenshot.png "events manager")

A simple full-featured website for managing events centers and scheduling events..

EventsManager is proudly hosted on [heroku](https://events-manager-io.herokuapp.com/) :smile:.


## Made With 
  ### Client
    * Bootstrap4 for UI styling 
    * React for managing UI states
    * Redux for flux-like app development
    * SASS for custom styling 
    * Webpack & Uglifyjs for bundling and load-time optimization

  ### Server
    * Nodejs for server-side logic
    * Express for api routes implementation
    * Json Web Tokens for session authentication
    * Postgresql & Sequelize for database management
    * Heroku for hosting services 

  ### Continuous Integration
    * Travis CI & Codeclimate for test automation
    * Coveralls for test coverage report
    * Hounds CI for linting report
  
  ### Test-Driven Development
    * Mocha & Chai for api route testing 
    * Jest & Enzyme for UI testing 
    * Nightwatch & Selenium for end-to-end testing
    


## Installation.
  * Install [Nodejs](https://nodejs.org/en/download/) and [Postgres SQL](https://www.postgresql.org/download/)
  * Clone this repo ``` git clone https://github.com/AppCypher/EventsManager.git ```
  * Run ```npm install``` to install the required dependencies
  * Run ```npm test``` to fireup the tests
  * Navigate to http://localhost:3000/


## Available Task Runners
  ### Development 
    * ```npm run sass:watch``` to generate css files 
    * 

  ### Production 
    *
    *


## Available APIs
- API routes for users to create accounts and login to the application
  * POST : ```/api/v1/users```  (username, fullname, password, email)
  *  POST : ```/api/v1/users/login``` (username, password)

- An API route for logging out user
  * POST : ```/api/v1/users/logout```

- An API route that allow users to add new event
  * POST : ```/api/v1/events``` 

- An API route that allow users to modify an event
  * PUT : ```/api/v1/events/<eventId>``` 

- An API route that allow users to delete an event
  * DELETE : ```/api/v1/events/<eventId>``` 

- An API route that allow users to gets all available event centers
  * GET : ```/api/v1/centers```

- An API route that allow users to gets more details on a particualar event center
  * GET : ```/api/v1/centers/<centerId>```

- An API route that allow admin users to add new event centers 
  * POST : ```/api/v1/centers```

- An API route that allow admin users to modify existing event centers 
  * PUT : ```/api/v1/centers```


Check [here](https://app.swaggerhub.com/apis/appcypher/eventsmanager/1.0.0) for full documentation.

## License
[Apache License 2.0](https://github.com/AppCypher/HelloBooks/blob/master/LICENSE)
