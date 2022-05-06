const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const MeasurementController = require('../http/controller/measurementController')

router.use(logger)

router.get('/', (req, res) => {
    MeasurementController.getIaq(req, res)
})

router.post('/', (req, res) => {
    MeasurementController.createMeasurement(req, res)
})

router.get('/:user_id', (req, res) => {
    MeasurementController.getMeasurement(req, res)
})

module.exports = router
