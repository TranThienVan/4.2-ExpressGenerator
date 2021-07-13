const express = require('express')
const router = express.Router()

let {jobs} = require('../data/data.json')

// CRUD job

// CREATE
// - When creating a job, we mus account for admissable params
const admissableJobParams = ['firstName', 'lastName']
router.post('/', ()=> {
    const job = {}
    for(const param of admissableJobParams){
        if (req.body[param]) job[param] = req.body[param];
    }

    job.fullName = req.body.firstName + " " + req.body.lastName

    jobs.push(job)
    res.send(job)
})

// READ
// - Page, Limit
// - http://localhost:5000/jobs/:jobId/spam/:spamId

// - Query String Params
// - http://localhost:5000/jobs>city=Paris
const filterableJobParams = ['city', 'name']
router.get('/', (req, res) =>{
    try {
        console.log({page: req.page})
        console.log({page: req.limit})
        res.status(202).send(jobs.slice(0, 19))
    } catch (error) {
        res.status(404).send("Oops, an error has occured")
    }
    
})


// UPDATE
router.patch('/:id', (req, res) =>{
    try {

        const idx = jobs.findIndex((f) => f.id == parseInt(req.params.id))

        const job = job[idx]

        for(const param of admissableJobParams){
            if (req.body[param]) job[param] = req.body[param];
        }

        job.fullName = req.body.firstName + " " + req.body.lastName

        res.send(jobs)
        
    } catch (error) {
        res.status(404).send("Oops, an error has occured")
    }

})



// DELETE
router.delete('/:id', (_, res) =>{
    jobs = jobs.filter(f => f.id !== parseInt(req.params.id))
    res.send(jobs)
})


module.exports = router