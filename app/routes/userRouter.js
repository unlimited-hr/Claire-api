const express = require('express')
const router = express.Router()
const logger = require('../http/middleware/logger')
const UserController = require('../http/controller/userController')

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

module.exports = router
