const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const UserController = require('../http/controller/userController')
const checkUser = require('../helpers/checkUser.js')

router.use(logger)

router.get('/', (req, res) => {
    UserController.getUsers(req, res)
})

router.post('/', (req, res) => {
    UserController.createUser(req, res)
})

router.get('/:user_id', (req, res) => {
    UserController.getUser(req, res)
})

router.delete('/:user_id', async (req, res) => {
    if (!( await checkUser(req, req.params.user_id))) {
        res.status(403).json("Forbidden resource; incorrect or no credentials provided.");
    } else { 
        UserController.forgetUser(req, res)
    }
})

module.exports = router
