const express = require('express')
const router = express.Router()
const {Signup, Login, UserInfo} = require('../controllers/userController')
const protect = require('../middlewares/authMiddleware')

router.route('/signup').post(Signup)
router.route('/login').post(Login)  
router.route('/info').get(protect, UserInfo)


module.exports = router