const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')
const User = require('../models/userModel')
const Place = require('../models/placeModel')

// @desc    Book a plce
// @route   POST /api/booking 
// @access  Private 
const BookPlace = asyncHandler(async(req, res) => {
  const data = {
    customer, owner, place, checkIn, checkOut, guests, phone, cost, due
  } = req.body

  const bookings = await Booking.find({place, customer})

  if(bookings && bookings.length > 0){
    res.status(401)
    throw new Error('You have already booked this place')
  }

  if(req.user.id == owner){
    res.status(401)
    throw new Error('Can not book your own place')
  }
  if(!phone || phone.length != 11){
    res.status(401)
    throw new Error ('Please enter correct phone number')
  }
  const booking = await Booking.create({
    customer, owner, place, checkIn, checkOut, guests, phone, cost, due, approved:false
  })
  res.status(200)
  res.json({'message': 'Booked!'})
})

// @desc    Get user's bookings
// @route   GET /api/booking/
// @access  Private 
const GetBookings =  asyncHandler(async(req, res) => {
  const bookings = await Booking.find({customer:req.user.id})
  let places = []
  let owners = []

  if(bookings && bookings.length !== 0){
    for(let i=0; i<bookings.length; i++){
      const place = await Place.findById(bookings[i].place).select('photos title types address price')
      const owner = await User.findById(bookings[i].owner).select('name email')
      places.push(place)
      owners.push(owner)
    }
    res.status(200)
    res.json({
      'bookings': bookings,
      'places': places,
      'owners': owners
    })
  }
  else{
    res.status(401)
    throw new Error('No bookings found')
  }
})

// @desc    Get user's bookings
// @route   GET /api/booking/
// @access  Private 
const GetBooked =  asyncHandler(async(req, res) => {
  const bookings = await Booking.find({owner:req.user.id})
  let places = []
  let owners = []
  let customers = []

  if(bookings && bookings.length !== 0){
    for(let i=0; i<bookings.length; i++){
      const place = await Place.findById(bookings[i].place).select('photos title types address price')
      const owner = await User.findById(bookings[i].owner).select('name email')
      const customer = await User.findById(bookings[i].owner).select('name email')
      places.push(place)
      owners.push(owner)
      customers.push(customer)
    }
    res.status(200)
    res.json({
      'bookings': bookings,
      'places': places,
      'owners': owners,
      'customers': customers
    })
  }
  else{
    res.status(401)
    throw new Error('No bookings found')
  }
})

const ApproveBooking = asyncHandler(async(req, res) => {
  const id = req.params.id 
  const action = req.params.action 

  const booking = await Booking.findById(id)
  const user = await User.findById(req.user.id)
  const owner = await User.findById(booking.owner)

  if(booking && user && owner && user.equals(owner)){
    switch(action){
      case 'approve':
        await booking.set({approved:true})
        res.status(200).json({'message': 'Approved'})
        await booking.save()
        break
      case 'pending':
        await booking.set({approved:false})
        res.status(200).json({'message': 'Pending'})
        await booking.save()
        break
      case 'cancel':
        await booking.deleteOne()
        res.status(200).json({'message': 'Cancel'})
        await booking.save()
        break
      default:
        res.status(400)
        throw new Error('Action not valid')
    }
  }
  else{
    res.status(400)
    throw new Error('Something went wrong')
  }
})

module.exports = {
  BookPlace,
  GetBookings,
  GetBooked,
  ApproveBooking
}