var express = require('express');
var router = express.Router();


// Foos
const foosApi= require('./foos.api')
router.use('/foos', foosApi)

// Jobs
const jobsApi = require('./jobs.api')
router.use('/jobs', jobsApi)

// Companies
const companiesApi = require('./companies.api')
router.use('/companies', companiesApi)

module.exports = router;
