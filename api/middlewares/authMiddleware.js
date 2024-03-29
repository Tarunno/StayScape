const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler(async (req, res, next) => {
  let token 
  
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      token = req.headers.authorization.split(' ')[1]
      
      if(token !== 'undefined'){
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
      }
      else{
        res.status(401)
        return res.json({'message': 'No authorization token!'})
      }
      next()
    } 
    catch(err){
      console.log(err)
      res.status(401)
      throw new Error('Not authorized!')
    }
  }
  if(!token){
    res.status(401)
    throw new Error('No authorization token!')
  }
})

module.exports = protect