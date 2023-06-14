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