import {isAuthenticate} from './auth' 

const BASE_URL = 'http://localhost:5000/api/place'


// @desc    Add new place
// @route   POST /api/place/add-place 
// @access  Private 
export const addPlaces = async (photos, data) => {
  const user = isAuthenticate()
  
  let formData = new FormData()

  Object.entries(data).forEach(function([key, value]) {
    if(Array.isArray(value)){
      value.forEach((val) => {
        formData.append(key, val)
      }) 
    }
    else{
      formData.append(key, value)
    }
  })

  for(let i=0; i<photos.length; i++){
    formData.append('photos', photos[i])
  }

  console.log(Array.from(formData));
  const res = await fetch(BASE_URL + '/add-place ', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + user.token 
    },
    body: formData
  })
  const result = await res.json()
  return result
}


// @desc    Get all places of a user
// @route   GET /api/place 
// @access  Private 
export const getPlaces = async () => {
  const user = isAuthenticate()

  const res = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + user.token 
    }
  })
  const result = await res.json()
  return result
}


// @desc    Get single place
// @route   GET /api/place 
// @access  Private 
export const getPlace = async (id) => {
  const res = await fetch(BASE_URL + '/' + id , {
    method: 'GET'
  })
  const result = await res.json()
  return result
}


// @desc    Update a place
// @route   PUT /api/place/update-place 
// @access  Private 
export const updatePlace = async (photos, data) => {
  const user = isAuthenticate()

  let formData = new FormData()
  console.log(photos);

  Object.entries(data).forEach(function([key, value]) {
    console.log(key, value);
    if(Array.isArray(value)){
      value.forEach((val) => {
        formData.append(key, val)
      }) 
    }
    else{
      formData.append(key, value)
    }
  })
  
  console.log(Array.from(formData));
  const res = await fetch(BASE_URL + '/update-place ', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + user.token 
    },
    body: formData
  })
  
  const result = await res.json()
  return result
}
