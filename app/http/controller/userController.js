const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../../database/database')

const User = db.User
const Device_Connections = db.Device_Connections;

const UserController = {
    async getUsers(req, res, options) {
        const users = await User.findAll();
        return res.json(users)
    },
    async getUser(req, res, options) {
        const user = await User.findByPk(req.params.user_id);
        return res.json(user)
    },
    async createUser(req, res, options) {
        const user = await User.create({ ...req.body });
        return res.status(201).json(user)
    },
    async forgetUser(req, res, options) {
        await User.destroy({ "where": { "id": req.params.user_id } });
        await Device_Connections.destroy({ "where": { "iser_id": req.params.user_id } });

        return res.status(204).json("succesfully forgot user.");
    }
}

module.exports = UserController
