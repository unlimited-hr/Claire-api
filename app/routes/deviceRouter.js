const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const DeviceController = require('../http/controller/deviceController')

router.use(logger)

router.get('/', (req, res) => {
    DeviceController.getDevices(req, res)
})

router.post('/', (req, res) => {
    DeviceController.createDevice(req, res)
})

module.exports = router
