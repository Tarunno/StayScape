import {isAuthenticate} from './auth' 

const BASE_URL = 'http://localhost:5000/api/home'


// @desc Get all places
// @route GET /api/home 
// @access Private 
export const getPlaces = async (type) => {
  const res = await fetch(BASE_URL + '/' + type, {
    method: 'GET'
  })
  const data = await res.json() 
  return data
}

// @desc Save a place
// @route GET /api/home 
// @access Private 
export const savePlace = async (id) => {
  const user = isAuthenticate()

  const res = await fetch(BASE_URL + '/save/' + id, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  })
  const data = await res.json() 
  return data
}

// @desc Gte save places
// @route GET /api/home 
// @access Private 
export const getSavedPlaces = async () => {
  const user = isAuthenticate()

  const res = await fetch(BASE_URL + '/save/all' , {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + user.token
    }
  })
  const data = await res.json()
  return data
}
