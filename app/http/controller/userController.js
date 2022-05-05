const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../../database/database')

const UserMaker = require('../../models/user')
const User = UserMaker(db, DataTypes)

const UserController = {
    async getUsers(req, res) {
        const jane = User.build({ firstName: "Jane", lastName: "Doe" });
        return res.json(JSON.stringify(jane))
    },
    async getUser(req, res, options) {
        const user = User.findAll();
        return res.send(user)
    },
}

module.exports = UserController
