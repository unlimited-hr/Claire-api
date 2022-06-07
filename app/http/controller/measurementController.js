const db = require('../../database/database')
const { Op } = require("sequelize");
const res = require('express/lib/response');

const Measurement = db.Air_Measurement
const Device_Connection = db.Device_Connections

const MeasurementController = {
    async getIaq(req, res, period = "all", options) {
        if (period == "all") {
            const measurements = await Measurement.findAll({ include: db.Device });
            return res.json(measurements)
        } else {
            const current_time = new Date(Date.now());
            const start_time = new Date(Date.now() - period)
            const measurements = await Measurement.findAll({
                include: db.Device,
                where: {
                    "measured_at": {
                        [Op.between]: [start_time, current_time]
                    }
                }
            });
            return res.json(measurements)
        }
    },
    async createMeasurement(req, res, options) {
        let current_time = Date.now()
        const measurement = await Measurement.create({ ...req.body, measured_at: current_time })
        return res.status(201).json(measurement)
    },
    async createIaq(req, res) {
        let current_time = Date.now()
        const measurement = await Measurement.create({
            "temperature": req.query.t,
            "humidity": req.query.h,
            "tvoc": req.query.tvoc,
            "co2": req.query.co2,
            "device_id": req.query.device_id,
            measured_at: current_time })
        return res.json(measurement)
    },
    async getMeasurementsByUser(req, res, start_time, period, options) {
        const user_id = req.params.user_id;
        const device_connections = (await Device_Connection.findAll({ where: { "user_id": user_id } })).map(
            (conn) => conn.dataValues.device_id)
        let measurements;

        if (period == "all")
            measurements = await Measurement.findAll({
                include: db.Device,
                where: { "device_id": { [Op.or]: device_connections } }
            });
        else if (period == "latest") {
            measurements = await Measurement.findOne({
                include: db.Device,
                where: { "device_id": { [Op.or]: device_connections } },
                order: [ [ 'measured_at', 'DESC' ]],
            });
        }
        else {
            const current_time = new Date(Date.now());
            const start_time = new Date(Date.now() - period)
            measurements = await Measurement.findAll({
                include: db.Device,
                where: {
                    [Op.and]: {
                        "device_id": {
                            [Op.or]: device_connections
                        },
                        "measured_at": {
                            [Op.between]: [start_time, current_time]
                        }
                    }
                }
            });
        }
        return measurements
    }
}

module.exports = MeasurementController
