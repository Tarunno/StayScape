import {isAuthenticate} from './auth' 

const BASE_URL = 'http://localhost:5000/api/booking'

// @desc    Book a place
// @route   POST /api/booking 
// @access  Private 
export const bookPlace = async (payload) => {
  const user = await isAuthenticate()

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + user.token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  const data = await res.json()
  return data
}


// @desc    Get user's bookings
// @route   GET /api/booking/
// @access  Private 
export const getBookings = async () => {
  const user = isAuthenticate()
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  })
  const data = await res.json()
  return data
}

// @desc    Get user's booked places
// @route   GET /api/booking/booked
// @access  Private 
export const getBooked = async () => {
  const user = isAuthenticate()
  const res = await fetch(BASE_URL + '/booked', {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  })
  const data = await res.json()
  return data
}

// @desc    Approve, pending or cancel a booking
// @route   GET /api/booking/booked/:action/:id
// @access  Private 
export const approveBooking = async (id, action) => {
  const user = isAuthenticate()
  const res = await fetch(BASE_URL + '/booked/' + action + '/'+ id,  {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  })
  const data = await res.json()
  return data
}