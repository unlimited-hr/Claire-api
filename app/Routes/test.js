const express = require('express')
const router = express.Router()
const logger = require('../Http/Middleware/logger')

router.use(logger)
router.get('/', (req, res) => {
    res.json({
        CO2: 'Among',
        VOC: 'gus'
    }).status(200)
})

module.exports = router
