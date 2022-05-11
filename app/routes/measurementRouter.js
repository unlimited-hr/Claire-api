const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const MeasurementController = require('../http/controller/measurementController')
const predict = require('../helpers/prediction.js')
const periods = {
    'minute': 1,
    'hour': 60,
    'day': 24 * 60,
    'week': 24 * 60 * 7,
    'month': 24 * 60 * 30,
    'year': 24 * 60 * 365
}

const prediction_period = 24 * 60 * 2;

router.use(logger)

router.get('/', (req, res) => {
    MeasurementController.getIaq(req, res)
})

router.post('/', (req, res) => {
    MeasurementController.createMeasurement(req, res)
})

router.get('/:user_id', (req, res) => {
    let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), "all");
    iaq_promise
    .then(iaq => res.json(iaq));
})

router.get('/:user_id/predict', (req, res) => {
    // let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), prediction_period * 60 * 1000);
    // iaq_promise
    // .then(iaq => predict(iaq))
    // .then(prediction => res.json(prediction));
    res.json("To ventilate properly, you can open a door or window. \n If you live near a busy street, it is better to ventilate in the evening and at night as there's less traffic.")
})

router.get('/:user_id/:period', (req, res) => {
    let period = req.params.period;
    let time;
    if (period in periods) time = periods[period];
    else time = parseInt(period);
    let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), time * 60 * 1000)
    iaq_promise
    .then(iaq => res.json(iaq));
})

module.exports = router
