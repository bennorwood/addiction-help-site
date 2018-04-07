# Waitr Challenge

[![Build Status](https://travis-ci.org/bennorwood/challenge.svg?branch=master)](https://travis-ci.org/bennorwood/challenge)

Visit the site: https://bennorwood-challenge.herokuapp.com/

## Delivery Recommendation Service
Given a data set of drivers and a data set of deliveries, provide a RESTful service that implements a Swagger specification such that if every driver accepted their first recommendation,
all deliveries would be completed with least amount of missed delivery commitments.

### How will I solve this problem
I will treat the incoming delivery data set as an asynchronous batch of incoming orders. I will sort the incoming list by the deliver by time. Then after this I will load all of the
drivers into memory and begin scheduling the next 'shortest on time delivery'. A delivery is considered on time if the driver can get to the pickup location, then the dropoff location
starting from their current location before the deliver by time. I will make use of the google maps api to calculate the time it will take for a driver to make this trip. The driver that can
complete this delivery in the shortest amount of time will be scheduled and their in-memory current location will be updated to the dropoff location along with a generated 'busyUntil' property
which represents the date-time that the driver is free to be scheduled for another order. Orders that have been scheduled will be persisted with the associated driver information. Orders that
cannot be scheduled by the criteria above will be assigned to the 'Late Deliveries' driver.


## Architectural Direction and Choices

Fullstack (focus on backend): will include both frontend, backend, and CI/CD tooling automation.

### Frontend
Most comfortable with the javascript and css frameworks below. Will use CDNs to pull in needed dependencies.

Angular 1.x.x
Bootstrap 3.x

### Backend

#### Platform
I will be using the NodeJS platform paired with Heroku's free Platform as a Service (Paas). I have a solid base experience and a good deal of comfort with the platform,
services and documentation of these tools. I also decided to use the Travis CI tool to run test (static analysis and test suite with coverage threshold) builds before deployment.
In the past I have mentored a few capstone teams and an intern group in successfully using heroku to stand up staging environments. I have used NodeJS for 2+ years.

Heroku Paas docs: https://devcenter.heroku.com/
NodeJS docs: https://nodejs.org/en/docs/
TravisCI docs: https://docs.travis-ci.com/

#### DB Persistence and Object modeling and mapping
I decided to move forward with MongoDB Atlas' free Database as a service (Daas) + Mongoose since I also have previous experience with these tools and their documentation. I
find the developer experience is pretty friendly.

MongoDB Atlas Daas Docs: https://docs.atlas.mongodb.com/getting-started/
Mongoose Docs: http://mongoosejs.com/

#### Express Web Application Framework (Prior Experience)
Docs: http://expressjs.com/en/api.html

### Miscellaneous/Other
Nconf - Hierarchical configuration: https://github.com/indexzero/nconf
Mocha + supertest + codecov - Unit Testing Framework + Code Coverage Reporting: https://mochajs.org
eslint - Static analysis tool: https://eslint.org/docs/user-guide/getting-started

_**Before attempting to run this app locally, you will need to complete the 'Building' & 'Configuration' sections:**_

## Building 
You will need to pull all of the third party dependencies for this application to run properly. You should have NodeJS installed before continuing.

To build this application, run the following command:

```
npm install
```

## Contributing!

Before submitting any code for review, please run the following:


Static Analysis tool
```
npm run lint
```

Run the unit test suite
```
npm test
```

And make any necessary code changes if the JS linting fails or if code is below coverage threshold.

## Configuration
To specify your own config overrides, you may set the environment variables listed below or edit the 'custom.config.json' file in the <root>/server/config/ directory. This json file will
override any of the default configuration specified in the beaux-bot/src/config/configuration.js file. Command line and environment variables 
will still take precedence over properties specified in your custom.config.json file.

> Note: Never store your keys in a public repo! The custom.config.json file is in the .gitignore for a reason!

### Needed Environment Variables
 - mongo_user: represents mongo db username
 - mongo_password: represents the password for the user above to connect to your mongoDb instance
 - GOOGLE_API_KEY: api key for google maps api


## Running the server
### To run the server normally execute the following command:

```
npm start
```

### To run in DEVELOPMENT mode execute the following command:

```
npm run start-dev
```

## Debugging the Server
To debug the server using Chrome dev tools run the following command:

```
node --inspect --debug-brk server.js
```
