import {isAuthenticate} from './auth' 

const BASE_URL = 'http://localhost:5000/api/home'


// @desc Get all places
// @route GET /api/home 
// @access Private 
export const getPlaces = async () => {
  const res = await fetch(BASE_URL, {
    method: 'GET'
  })
  const data = await res.json() 
  return data
}