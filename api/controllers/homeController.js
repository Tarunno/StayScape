const asyncHandler = require('express-async-handler')
const Place = require('../models/placeModel')
const User = require('../models/userModel')

// @desc    Get all places
// @route   GET /api/place 
// @access  Private 
const GetPlaces = asyncHandler(async(req, res) => {
  const type = req.params.type
  let places = await Place.find({}).select('-description -extraInfo -owner')
  
  let result = []
  if(type != 'all'){
    for(let i=0; i<places.length; i++){
      if(places[i].types.indexOf(type) !== -1){
        result.push(places[i])
      }
    }
    res.status(200)
    res.json(result)
  }

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