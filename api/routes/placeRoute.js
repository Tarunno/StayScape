const express = require('express')
const router = express.Router()
const multer = require('multer')
const protect = require('../middlewares/authMiddleware')
const { AddPlace, GetPlaces, UpdatePlace, GetPlace } = require('../controllers/placeController')

const photosMiddleware = multer({dest:'api/media/places/'})

router.route('/').get(protect, GetPlaces)
router.route('/:id').get(GetPlace)
router.route('/add-place').post(protect, photosMiddleware.array('photos', 100), AddPlace)
router.route('/update-place').post(protect, photosMiddleware.array('photos', 100), UpdatePlace)

module.exports = router