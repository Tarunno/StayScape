const asyncHandler = require('express-async-handler')
const Place = require('../models/placeModel')
const Save = require('../models/saveModel')
const User = require('../models/userModel')

// @desc    Get all places
// @route   GET /api/home/:type
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
  else{
    if(places){
      res.status(200)
      res.json(places)
    }
    else{
      res.status(401)
      res.json({'message': 'No places listed'})
    }
  }
})


// @desc    Save a place
// @route   GET /api/home/save/:id
// @access  Private 
const SavePlace = asyncHandler(async(req, res) => {
  const id = req.params.id
  const user = await User.findById(req.user.id)
  const place = await Place.findById(id).select('title photos')
  
  if(place && user){
    const save = await Save.findOne({place:place._id, user:user._id})
    if(save){
      await save.deleteOne({})
      res.status(200)
      res.json({'message': 'unsaved'})
    }
    else{
      await Save.create({
        place: place._id,
        user: user._id,
        title: place.title,
        photos: place.photos
      })
      res.status(200)
      res.json({'message': 'saved'})
    }
  }
  else{
    res.status(200)
    res.json({'message': 'saveController called'})
  }
})


// @desc    Get saveed places
// @route   GET /api/home/save
// @access  Private 
const GetSavedPlaces = asyncHandler(async(req, res) => {
  const save = await Save.find({user: req.user.id})
  res.status(200)
  res.json(save)
})

module.exports = {
  GetPlaces,
  SavePlace,
  GetSavedPlaces
}