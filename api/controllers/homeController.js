const asyncHandler = require('express-async-handler')
const Place = require('../models/placeModel')
const User = require('../models/userModel')

// @desc    Get all places
// @route   GET /api/place 
// @access  Private 
const GetPlaces = asyncHandler(async(req, res) => {
  const places = await Place.find({}).select('-description -perks -extraInfo -bedrooms -beds -bathrooms -types -owner')
  if(places){
    res.status(200)
    res.json(places)
  }
  else{
    res.status(401)
    res.json({'message': 'No places listed'})
  }
})

module.exports = {
  GetPlaces
}