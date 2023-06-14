const BASE_URL = 'http://localhost:5000'

// @desc    Check authentication credentials
// @route   localStorage/StayScape_auth
// @access  Local machine (user's device)
export const isAuthenticate = () => {
  const user = JSON.parse(localStorage.getItem('StayScape_auth'))
  if(user){
    return user
  }
  return false
}

// @desc    Remove authentication credentials
// @route   localStorage/StayScape_auth
// @access  Local machine (user's device)
export const Logout = () => {
  localStorage.removeItem('StayScape_auth')
}

// @desc    Set Authentication credentials
// @route   POST /api/user/:action
// @access  Public
export const Authenticate = async (cardinals, action) => {
  action = action.toLowerCase().replace(' ', '')
  const res = await fetch(BASE_URL + '/api/user/' + action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardinals.name,
      email: cardinals.email,
      password: cardinals.password
    })
  })
  const data = await res.json()
  if(!data['message']) localStorage.setItem('StayScape_auth',  JSON.stringify(data))
  return data
}