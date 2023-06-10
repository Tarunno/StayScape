const express = require('express')
const router = express.Router()
const multer = require('multer')
const protect = require('../middlewares/authMiddleware')
const { AddPlace, GetPlaces } = require('../controllers/placeController')

const photosMiddleware = multer({dest:'api/media/places/'})

router.route('/add-place').post(protect, photosMiddleware.array('photos', 100), AddPlace)
router.route('').get(protect, GetPlaces)

module.exports = router