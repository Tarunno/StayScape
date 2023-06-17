const mongoose = require('mongoose')

const saveSchema = mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  photos: [String]
})

module.exports = mongoose.model('Save', saveSchema)
