const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  phone: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  cost: Number,
  due: Number, 
  approved: Boolean
})

module.exports = mongoose.model('Booking', bookingSchema)
