const express = require('express')
const router = express.Router()

let {companies} = require('../data/data.json')

// CRUD company

// CREATE
// - When creating a company, we mus account for admissable params
const admissableCompanyParams = ['companyName', 'stockLabel']
router.post('/', ()=> {
    const company = {}
    for(const param of admissableCompanyParams){
        if (req.body[param]) company[param] = req.body[param];
    }

    company.fullName = req.body.firstName + " " + req.body.lastName

    companies.push(company)
    res.send(company)
})

// READ
// - Page, Limit
// - http://localhost:5000/companies/:companyId/spam/:spamId

// - Query String Params
// - http://localhost:5000/companies>city=Paris
const filterablecompanyParams = ['city', 'name']
router.get('/', (req, res) =>{
    try {
       
        let page = req.page
        let limit = req.limit
        let companyNames = ['Facebook', 'Apple', 'Twitch']
        // console.log({page: req.page})
        // console.log({limit: req.limit})
        
        // As a client app I can make a GET request to http://localhost:5000/companies?page=n and receive an array, the nth array of 20 companies.
        if(req.query.page == req.page){
            console.log({page: req.page})
            console.log({page: req.query.page})
            console.log({limit: req.query.limit})
            
            let result = companies.slice((limit*(page-1)), limit*page)
            res.status(202).send(result)
            console.log(result.length)
        } else if (req.query.name === "Facebook"){
            let result = []
            console.log(req.query.name)
            for(let i in companies){
                result.push(companies[i])
            }
            result = result.filter((x) => x.name === "Facebook")
            res.status(202).send(result)
        } else {
            let result = []
            for (let i in companies){
                result.push(companies[i])
            }
            console.log(req.query.name)
            // console.log(result)
            res.status(202).send(result)
        }
        
    } catch (error) {
        res.status(404).send("Oops, an error has occured")
    }
    
})


// UPDATE
router.patch('/:id', (req, res) =>{
    try {

        const idx = companies.findIndex((f) => f.id == parseInt(req.params.id))

        const company = company[idx]

        for(const param of admissableCompanyParams){
            if (req.body[param]) company[param] = req.body[param];
        }

        company.fullName = req.body.firstName + " " + req.body.lastName

        res.send(companies)
        
    } catch (error) {
        res.status(404).send("Oops, an error has occured")
    }

})


// DELETE
router.delete('/:id', (_, res) =>{
    companies = companies.filter(f => f.id !== parseInt(req.params.id))
    res.send(companies)
})


module.exports = router