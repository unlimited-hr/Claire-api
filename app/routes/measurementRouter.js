const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const MeasurementController = require('../http/controller/measurementController')
const {predict, train} = require('../helpers/prediction.js')
const checkUser = require('../helpers/checkUser.js')
const periods = {
    'minute': 1,
    'hour': 60,
    'day': 24 * 60,
    'week': 24 * 60 * 7,
    'month': 24 * 60 * 30,
    'year': 24 * 60 * 365,
    'latest': "latest"
}
// 30 -> half hour
const prediction_period = 30;

router.get('/', (req, res) => {
    MeasurementController.getIaq(req, res)
})

router.get('/create', async (req, res) => {
    MeasurementController.createIaq(req, res)
})

router.post('/', (req, res) => {
    MeasurementController.createMeasurement(req, res)
})

router.get('/:user_id', async (req, res) => {
    if (!( await checkUser(req, req.params.user_id))) {
        res.status(403).json("Forbidden resource; incorrect or no credentials provided.");
    } else {
        let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), "all");
        iaq_promise
        .then(iaq => res.json(iaq));
    }
})

router.get('/:user_id/train', (req, res) => {
    let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), "all");
    iaq_promise
    .then(iaq => train(iaq, prediction_period))
    .then(prediction => res.json(prediction));
    // res.status(418).json("To ventilate properly, you can open a door or window. \n If you live near a busy street, it is better to ventilate in the evening and at night as there's less traffic.")
})

router.get('/:user_id/predict', (req, res) => {
    let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), prediction_period * 60 * 10000000);
    iaq_promise
    .then(iaq => predict(res, iaq, prediction_period))
    .then(prediction => res.json(prediction));
    // res.status(418).json("To ventilate properly, you can open a door or window. \n If you live near a busy street, it is better to ventilate in the evening and at night as there's less traffic.")
})

router.get('/:user_id/:period', async (req, res) => {
    if (!( await checkUser(req, req.params.user_id))) {
        res.status(403).json("Forbidden resource; incorrect or no credentials provided.");
    } else {
        let period = req.params.period;
        let iaq_promise;
        if (period == "latest") {
            iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), "latest");
        } else {
            let time;
            if (period in periods) time = periods[period];
            else time = parseInt(period);
            iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), time * 60 * 1000)
        }
        iaq_promise
        .then(iaq => res.json(iaq));
    }
})

module.exports = router
