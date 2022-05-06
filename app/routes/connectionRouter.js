const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const ConnectionController = require('../http/controller/connectionController')

router.use(logger)

router.get('/', (req, res) => {
    ConnectionController.getConnections(req, res)
})

router.post('/', (req, res) => {
    ConnectionController.createConnection(req, res)
})

module.exports = router
