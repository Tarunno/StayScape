const express = require('express')
const { 
  BookPlace, 
  GetBookings, 
  GetBooked, 
  ApproveBooking,
  GetNotification, 
  SeenNotification
} = require('../controllers/bookingController')
const router = express.Router()
const protect = require('../middlewares/authMiddleware')


router.route('/').post(protect, BookPlace).get(protect, GetBookings)
router.route('/booked').get(protect, GetBooked)
router.route('/booked/:action/:id').get(protect, ApproveBooking)
router.route('/notifications').get(protect, GetNotification)
router.route('/notifications/:id').get(protect, SeenNotification)

module.exports = router