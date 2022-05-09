const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../../database/database')

const Device = db.Device


const DeviceController = {
    async getDevices(req, res, options) {
        const devices = await Device.findAll({ include: User });
        return res.send(JSON.stringify(devices))
    },
    async createDevice(req, res, options) {
        const device = await Device.create({ ...req.body });
        return res.send(JSON.stringify(device))
    },
    async updateDevice(req, res, options) {
        const device = await Device.findByPk(req.params.device_id);
        device.update({...req.body})
        return res.send(JSON.stringify(device))
    }
}

module.exports = DeviceController
