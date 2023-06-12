const express = require('express')
const { GetPlaces } = require('../controllers/homeController')
const router = express.Router()

router.route('/').get(GetPlaces)

module.exports = router