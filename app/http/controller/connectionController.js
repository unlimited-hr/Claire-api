const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../../database/database')

const ConnectionMaker = require('../../models/device_connections')
const Connection = ConnectionMaker(db, DataTypes)

const ConnectionController = {
    async getConnections(req, res, options) {
        const connections = await Connection.findAll();
        console.log(connections)
        return res.send(JSON.stringify(connections))
    },
    async createConnection(req, res, options) {
        const connecetion = await Connection.create({ ...req.body });
        console.log(connecetion)
        return res.send(JSON.stringify(connecetion))
    }
}

module.exports = ConnectionController
