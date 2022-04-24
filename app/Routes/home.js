const express = require('express')
const router = express.Router()
const logger = require('../Http/Middleware/logger')

// middleware that is specific to this router
router.use(logger)
// define the home page route
router.get('/', (req, res) => {
    res.json({
        message: 'Home page'
    }).status(200)
})
// define the about route
router.get('/about', (req, res) => {
    res.send('About birds')
})

module.exports = router
