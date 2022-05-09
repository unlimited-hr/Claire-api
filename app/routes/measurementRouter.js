const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const MeasurementController = require('../http/controller/measurementController')
const periods = {
    'minute': 1,
    'hour': 60,
    'day': 24 * 60,
    'week': 24 * 60 * 7,
    'month': 24 * 60 * 30,
    'year': 24 * 60 * 365
}

router.use(logger)

router.get('/', (req, res) => {
    MeasurementController.getIaq(req, res)
})

router.post('/', (req, res) => {
    MeasurementController.createMeasurement(req, res)
})

router.get('/:user_id', (req, res) => {
    MeasurementController.getMeasurementsByUser(req, res, "all")
})

router.get('/:user_id/:period', (req, res) => {
    let period = req.params.period;
    let time;
    if (period in periods) time = periods[period];
    else time = parseInt(period);
    console.log(time)
    MeasurementController.getMeasurementsByUser(req, res, time * 60 * 1000)
})

module.exports = router
