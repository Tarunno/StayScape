const asyncHandler = require('express-async-handler')
const Place = require('../models/placeModel')
const fs = require('fs')

// @desc    Add new place
// @route   POST /api/place/add-place 
// @access  Private 
const AddPlace = asyncHandler(async(req, res) => {
  const {
    title, address, photoLinks, description, perks, extraInfo, 
    checkIn, checkOut, maxGuests, badrooms, beds, bathrooms, price, types
  } = req.body

  if(title=='' || address=='' || description==''){
    res.status(400)
    throw new Error('One of the fields (e.g. title, address, description) is empty')
  }
  if(perks.length==0){
    res.status(400)
    throw new Error('Add some perks of your place')
  }
  if(types.length==0){
    res.status(400)
    throw new Error('Add type of your place')
  }
  if(req.files.length == 0 && photoLinks.length == 0){
    res.status(400)
    throw new Error('Add photos of you place')
  }

  const uploadedFiles = []
  for(let i=0; i<req.files.length; i++){
    const {path, originalname} = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath)
  }

  const newPlace = Place.create({
    owner: req.user.id,
    photos: uploadedFiles,
    title, address, photoLinks, description, perks, extraInfo, 
    checkIn, checkOut, maxGuests, badrooms, beds, bathrooms, price, types
  }) 

  res.status(200)
  res.json({'success': 'Place added successfully'})
})


// @desc    Get all places
// @route   GET /api/place 
// @access  Private 
const GetPlaces = asyncHandler(async(req, res) => {
  const places = await Place.find({owner:req.user.id})
  if(places){
    res.status(200)
    res.json(places)
  }
  else{
    res.status(401)
    res.json({'message': 'You have no place yet'})
  }
})

module.exports = {
  AddPlace,
  GetPlaces
}