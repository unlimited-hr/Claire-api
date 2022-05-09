const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../../database/database')

const Measurement = db.Air_Measurement
const Device_Connection = db.Device_Connection

const MeasurementController = {
    async getIaq(req, res, options) {
        const measurements = await Measurement.findAll({ include: db.Device });
        console.log(measurements)
        return res.send(JSON.stringify(measurements))
    },
    async createMeasurement(req, res, options) {
        let current_time = Date.now()
        const measurement = await Measurement.create({...req.body, measured_at: current_time})
        return res.send(JSON.stringify(measurement))
    },
    async getMeasurement(req, res, options) {
        const user_id = req.params.user_id;
        const connections = await Device_Connection.findAll({where: {"user_id": user_id}})
        let iaq = []

        for (let c of connections) {
            console.log(c.device_id)
            let new_iaq = await Measurement.findAll({where: {"device_id": c.device_id}})
            iaq.push(...new_iaq)
        }

        // const devices = await Device.findAll();
        console.log(iaq)
        return res.send(JSON.stringify(iaq))
    },
}

module.exports = MeasurementController
