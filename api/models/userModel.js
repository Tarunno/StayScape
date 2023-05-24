const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add a name!']
  },
  email: {
    type: String,
    require: [true, 'Please add a email!'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: [true, 'Please add a email!']
  }
})

module.exports = mongoose.model('User', userSchema)