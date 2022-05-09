const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../../database/database')

const DeviceMaker = require('../../models/devices')
const Device = DeviceMaker(db.sequelize, DataTypes)


const DeviceController = {
    async getDevices(req, res, options) {
        const devices = await Device.findAll();
        console.log(devices)
        return res.send(JSON.stringify(devices))
    },
    async createDevice(req, res, options) {
        const device = await Device.create({ ...req.body });
        console.log(device)
        return res.send(JSON.stringify(device))
    },

}

module.exports = DeviceController
