const BASE_URL = 'http://localhost:5000'

export const isAuthenticate = () => {
  const user = JSON.parse(localStorage.getItem('BreezeBnB_auth'))
  if(user){
    return true
  }
  return false
}

export const Logout = () => {
  if(isAuthenticate()){
    localStorage.removeItem('BreezeBnB_auth')
  }
}

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
  if(!data['message']) localStorage.setItem('BreezeBnB_auth',  JSON.stringify(data))
  return data
}