const mongoose = require('mongoose')

const placeSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  address: String,
  photos: [String],
  photoLinks: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Date,
  checkOut: Date,
  maxGuests: Number,
  types: [],
  price: Number,
  bedrooms: Number,
  beds: Number,
  bathrooms: Number,
})

module.exports = mongoose.model('Place', placeSchema)