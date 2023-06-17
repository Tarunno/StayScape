const express = require('express')
const { GetPlaces, SavePlace, GetSavedPlaces } = require('../controllers/homeController')
const router = express.Router()
const protect = require('../middlewares/authMiddleware')

router.route('/:type').get(GetPlaces)
router.route('/save/all').get(protect, GetSavedPlaces)
router.route('/save/:id').get(protect, SavePlace)

module.exports = router