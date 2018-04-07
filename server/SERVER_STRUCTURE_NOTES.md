# Waitr Challenge
The following docs gives a brief guide of the structure of this application

## Foundation
This directory contains components that are 'the crux' of the application. Configuration, initialization, and algorithmic code lives here. The code I wrote to schedule deliveries lives in this directory

### config
Configuration and overrides live here

### initialize
Server boot process.

### services
Core services to the application

## routes
This directory contains the controllers or exposed apis that the application offers.
Note that routes/drivers/drivers.router.js contains the specified Rest endpoints for the solution

## schemas
This directory holds the models for the application. This application uses mongoose, therefore you see exported models based on this tool.

## utility
This folder contains batch processing tasks to import test data into a database. Note that you can visit the batch directory and run:

```
node batch.js
```

to get information in running the jobs.