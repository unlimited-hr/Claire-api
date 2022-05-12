const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const MeasurementController = require('../http/controller/measurementController')
const predict = require('../helpers/prediction.js')
const checkUser = require('../helpers/checkUser.js')
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

router.get('/create', async (req, res) => {
    MeasurementController.createIaq(req, res)
})

router.post('/', (req, res) => {
    MeasurementController.createMeasurement(req, res)
})

// const token = 'eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiRGFuaSIsImVtYWlsIjoiTmlnZWxpc2Jhc0BsaXZlLnNzc3MiLCJwYXNzd29yZCI6IiQyYiQxMCRXT0dBMzk2ZWFyM2RqYWxUb1gzSjl1OFRRVFE0eThrUVU5VFlsNTdNa01aMnE4eEtsS1dQNiIsInVwZGF0ZWRBdCI6IjIwMjItMDUtMTJUMTI6NDA6MjIuMzc3WiIsImNyZWF0ZWRBdCI6IjIwMjItMDUtMTJUMTI6NDA6MjIuMzc3WiJ9LCJpYXQiOjE2NTIzNTkyMjIsImlzcyI6ImFwcCIsImF1ZCI6ImFwaTpjbGFpcmUiLCJleHAiOjE2NTQ3Nzg0MjJ9.nMVo9LiA5SVT0RO73D8Jpxu_wXwgn6Zm7I1gXl47htBmAnZ2uud-qs2op9F9UzT3tJrhuZ3fNtRMKQRQfpQtYs8ITmSmPpBFjU6KlOvDelvIpE_a9ROJq1Gcl1xX-oNFyoPGjUeYfnC75sANPgHtHjNhEfMJzgT5U6MOmAsXTrSZtE01K7XAvAc3377jcpFcp6r8vyQ7ssosgVMXWb3Nk6Ph5xHdUm2Z0AjRDyZD_sJ-1cFtR3Ut0j8hY_9yfcI2z0d7tfxOpfVzTXxS_3ZyTXId1Ody_6WvPF8ficmEEDCM_aYCwW2QmuzPkrWhgW-GoCN4StTQeesxNO1FfkkrePg6Kc1kAd9reIvZr8RrQQGI8N0fNANzNqDFxh-pRzq3Kqg5UgKBckI0_Mk7v9aMixvG1-QMG72piNmqScohhSJbXuRg3K3ExeMMu6vBOobuZ0NPblP1RMscr6I53hIKtQGzpYE3U3U5CjnEuKS8vOHnrFkHzwH9ikg2IsC90Qmxzetj2l5bvzOqiOGxtIoayMZ5coPI6twYKZSZtEy_BVgVCDK02OpaxVs7tXOR7nntqPbmGEhGqwLHih9_2akcsc4PO_Ue_kh4A-EpRXv4YjhK8L4toYyGS_He3FD9LlbJ6baNHdg7TE0yhxcaspZFEFZgKeet8f8c6GW0FYfDVoc'
// const {payload, protectedHeader} = await verify(token)
// res.json(payload);

router.get('/:user_id', async (req, res) => {
    if (!( await checkUser(req, req.params.user_id))) {
        res.status(403).json("Forbidden resource; incorrect or no credentials provided.");
    } else {
        let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), "all");
        iaq_promise
        .then(iaq => res.json(iaq));
    }
})

router.get('/:user_id/predict', (req, res) => {
    // let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), prediction_period * 60 * 1000);
    // iaq_promise
    // .then(iaq => predict(iaq))
    // .then(prediction => res.json(prediction));
    res.status(418).json("To ventilate properly, you can open a door or window. \n If you live near a busy street, it is better to ventilate in the evening and at night as there's less traffic.")
})

router.get('/:user_id/:period', async (req, res) => {
    if (!( await checkUser(req, req.params.user_id))) {
        res.status(403).json("Forbidden resource; incorrect or no credentials provided.");
    } else {
        let period = req.params.period;
        let time;
        if (period in periods) time = periods[period];
        else time = parseInt(period);
        let iaq_promise = MeasurementController.getMeasurementsByUser(req, res, Date.now(), time * 60 * 1000)
        iaq_promise
        .then(iaq => res.json(iaq));
    }
})

module.exports = router
