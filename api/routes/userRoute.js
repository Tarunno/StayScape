const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const {Signup, Login} = require('../controllers/userController')

router.route('/signup').post(Signup)
router.route('/login').post(Login)  


module.exports = router