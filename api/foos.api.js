const express = require('express')
const router = express.Router()

let {foos} = require('../data/foos.json')

// CRUD Foo

// CREATE
// - When creating a foo, we mus account for admissable params
const admissableFooParams = ['firstName', 'lastName']
router.post('/', ()=> {
    const foo = {}
    for(const param of admissableFooParams){
        if (req.body[param]) foo[param] = req.body[param];
    }

    foo.fullName = req.body.firstName + " " + req.body.lastName

    foos.push(foo)
    res.send(foo)
})

// Read
// - Page, Limit
// - http://localhost:5000/foos/:fooId/spam/:spamId

// - Query String Params
// - http://localhost:5000/foos>city=Paris
const filterableFooParams = ['city', 'name']
router.get('/', (req, res) =>{
    try {
        res.status(202).send(foos)
    } catch (error) {
        res.status(404).send("Oops, an error has occured")
    }
    
})


// UPDATE
router.patch('/:id', (req, res) =>{
    try {

            
        const idx = foos.findIndex((f) => f.id == parseInt(req.params.id))

        const foo = foo[idx]

        for(const param of admissableFooParams){
            if (req.body[param]) foo[param] = req.body[param];
        }

        foo.fullName = req.body.firstName + " " + req.body.lastName

        res.send(foos)
        
    } catch (error) {
        res.status(404).send("Oops, an error has occured")
    }

})



// DELETE
router.delete('/:id', (_, res) =>{
    foos = foos.filter(f => f.id !== parseInt(req.params.id))
    res.send(foos)
})


module.exports = router