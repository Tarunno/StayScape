import {isAuthenticate} from './auth' 

const BASE_URL = 'http://localhost:5000'

export const addPlaces = async (photos, data) => {
  const user = isAuthenticate()
  
  let formData = new FormData()

  Object.entries(data).forEach(function([key, value]) {
    formData.append(key, value)
  })

  for(let i=0; i<photos.length; i++){
    formData.append('photos', photos[i])
  }
  const res = await fetch(BASE_URL + '/api/place/add-place ', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + user.token 
    },
    body: formData
  })
  const result = await res.json()
  return result
}

export const getPlaces = async () => {
  const user = isAuthenticate()
  
  let formData = new FormData()

  const res = await fetch(BASE_URL + '/api/place ', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + user.token 
    }
  })
  const result = await res.json()
  return result
}
