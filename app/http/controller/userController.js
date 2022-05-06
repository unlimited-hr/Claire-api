const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../../database/database')

const UserMaker = require('../../models/user')
const User = UserMaker(db, DataTypes)

const UserController = {
    async getUsers(req, res, options) {
        const users = await User.findAll();
        console.log(users)
        return res.send(JSON.stringify(users))
    },
    async getUser(req, res, options) {
        const user = await User.findByPk(req.params.user_id);
        console.log(req.params.user_id)
        return res.send(JSON.stringify(user))
    },
    async createUser(req, res, options) {
        const user = await User.create({ ...req.body });
        console.log(user)
        return res.send(JSON.stringify(user))
    }
}

module.exports = UserController
