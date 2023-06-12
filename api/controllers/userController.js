const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


const generateToken = id => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '5d'})

// @desc    Register new user
// @route   POST /api/users/signup 
// @access  Public 
const Signup = asyncHandler( async(req, res) => {
  const {name, email, password} = req.body

  if(!name | !email | !password){
    res.status(400)
    throw new Error('Empty required field(s)!')
  }

  const userExists = await User.findOne({email})

  if(userExists){
    res.status(400)
    throw new Error('Email should be unique!')
  }

  if(password.length < 8){
    res.status(400)
    throw new Error('Password should contain at least 8 characters!')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email, 
    password: hashedPassword
  })

  if(user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })
  }
  res.status(400)
  throw new Error('Something went wrong!')
})

// @desc    Authenticate a user
// @route   POST /api/users/login 
// @access  Public
const Login = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  if(!email | !password){
    res.status(400)
    throw new Error('Empty required field(s)!')
  }

  const userExists = await User.findOne({email})

  if(!userExists){
    res.status(401)
    throw new Error('User doesn\'t exists!')
  } 
  else{
    if(await bcrypt.compare(password, userExists.password)){
      res.status(202).json({
        _id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        token: generateToken(userExists.id)
      })
    }
    else{
      res.status(401)
      throw new Error('Invalid password!')
    }
  }
  res.status(400)
  throw new Error('Something went wrong!')
})

// @desc    Get user info
// @route   GET /api/user/info 
// @access  Private
const UserInfo = asyncHandler(async (req, res) => {
  const id = req.user.id 
  const user = await User.findById(id).select('-password')
  if(user){
    res.status(200)
    res.json(user)
  }
  res.status(404)
  throw new Error('User not found!')
})

module.exports = {
  Signup,
  Login,
  UserInfo
}