const db = require('../../database/database')
const { Op } = require("sequelize");

const Measurement = db.Air_Measurement
const Device_Connection = db.Device_Connections

const MeasurementController = {
    async getIaq(req, res, options) {
        const measurements = await Measurement.findAll({ include: db.Device });
        return res.json(measurements)
    },
    async createMeasurement(req, res, options) {
        let current_time = Date.now()
        const measurement = await Measurement.create({ ...req.body, measured_at: current_time })
        return res.json(measurement)
    },
    async getMeasurementsByUser(req, res, time, options) {
        const user_id = req.params.user_id;
        const device_connections = (await Device_Connection.findAll({ where: { "user_id": user_id } })).map(
            (conn) => conn.dataValues.device_id)
        let measurements;
        if (time == "all")
            measurements = await Measurement.findAll({
                where: { "device_id": { [Op.or]: device_connections } }
            });
        else {
            const current_time = new Date(Date.now());
            const start_time = new Date(Date.now() - time)
            console.log(current_time,start_time)
            measurements = await Measurement.findAll({
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

        return res.json(measurements)
    },
}

module.exports = MeasurementController
