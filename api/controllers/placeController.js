const asyncHandler = require('express-async-handler')
const Place = require('../models/placeModel')
const fs = require('fs')


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


// @desc    Add new place
// @route   POST /api/place/add-place 
// @access  Private 
const AddPlace = asyncHandler(async(req, res) => {
  const {
    title, address, photoLinks, description, perks, extraInfo, 
    checkIn, checkOut, maxGuests, bedrooms, beds, bathrooms, price, types
  } = req.body

  if(title=='' || address=='' || description==''){
    res.status(400)
    throw new Error('One of the fields (e.g. title, address, description) is empty')
  }
  else if(perks.length==0){
    res.status(400)
    throw new Error('Add some perks of your place')
  }
  else if(types.length==0){
    res.status(400)
    throw new Error('Add type of your place')
  }
  else if(req.files.length == 0 && photoLinks.length == 0){
    res.status(400)
    throw new Error('Add photos of you place')
  }
  else{
    const uploadedFiles = []
    for(let i=0; i<req.files.length; i++){
      const {path, originalname} = req.files[i]
      const parts = originalname.split('.')
      const ext = parts[parts.length-1]
      const newPath = path + '.' + ext
      fs.renameSync(path, newPath)
      uploadedFiles.push(newPath.replace('api\\media\\places\\', ''))
    }

    const newPlace = Place.create({
      owner: req.user.id,
      photos: uploadedFiles,
      title, address, photoLinks, description, perks, extraInfo, 
      checkIn, checkOut, maxGuests, bedrooms, beds, bathrooms, price, types
    }) 

    res.status(200)
    res.json({'success': 'Place added successfully'})
  }
})


// @desc    Get single place
// @route   GET /api/place 
// @access  Private 
const GetPlace = asyncHandler(async(req, res) => {
  const place = await Place.findById(req.params.id)
  if(place){
    res.status(200)
    res.json(place)
  }
  else{
    res.status(401)
    res.json({'error': 'Place does not exists'})
  }
})


// @desc    Update a place
// @route   PUT /api/place/update-place 
// @access  Private 
const UpdatePlace = asyncHandler(async(req, res) => {
  const {
    id, title, address, description, perks, extraInfo, photoLinks, photos,
    checkIn, checkOut, maxGuests, bedrooms, beds, bathrooms, price, types
  } = req.body

  const place = await Place.findById(id)
  console.log(place);

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

  const addedUploadedFiles = photos
  
  for(let i=0; i<req.files.length; i++){
    const {path, originalname} = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    addedUploadedFiles.push(newPath.replace('api\\media\\places\\', ''))
  }

  console.log(addedUploadedFiles)

  place.set({
    id,
    owner: req.user.id,
    photos: addedUploadedFiles,
    title, address, photoLinks, description, perks, extraInfo, 
    checkIn, checkOut, maxGuests, bedrooms, beds, bathrooms, price, types
  }) 

  place.save()

  res.status(200)
  res.json({'success': 'Place added successfully'})
})


module.exports = {
  AddPlace,
  GetPlaces,
  GetPlace,
  UpdatePlace
}