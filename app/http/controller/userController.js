const User = require('../../models/user')

const UserController = {
    async getUsers(req, res){
        const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
        return res.json(JSON.stringify(jane))
    },
    async getUser(req, res, options) {
        const user = User.findAll();
        return res.send(user)
    },
}

module.exports = UserController
