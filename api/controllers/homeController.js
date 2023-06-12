const asyncHandler = require('express-async-handler')
const Place = require('../models/placeModel')
const User = require('../models/userModel')

// @desc    Get all places
// @route   GET /api/place 
// @access  Private 
const GetPlaces = asyncHandler(async(req, res) => {
  const places = await Place.find({})
  let owners = []
  for(let i=0; i<places.length; i++){
    const owner = await User.findById(places[i].owner).select('-password')
    owners.push(owner)
  }
  if(places){
    res.status(200)
    res.json({places, owners})
  }
  else{
    res.status(401)
    res.json({'message': 'No places listed'})
  }
})

module.exports = {
  GetPlaces
}