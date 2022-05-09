const express = require('express')
const router = express.Router()
const DeviceController = require('../http/controller/deviceController')

router.get('/', (req, res) => {
    DeviceController.getDevices(req, res)
})

router.post('/', (req, res) => {
    DeviceController.createDevice(req, res)
})

router.put('/:device_id', (req, res) => {
    DeviceController.updateDevice(req, res)
})

module.exports = router
