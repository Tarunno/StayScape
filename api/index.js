const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const cors = require('cors')
const connectDB = require('./config/db')

const {errorHandler} = require('./middlewares/errorMiddleware')

const app = express()

const Notification = require('./models/notificationModel')
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

let onlineUsers = []

const addNewUser = (id, socketId) => {
  let newUser = true
  for(let i=0; i<onlineUsers.length; i++){
    if(onlineUsers[i].id == id){
      onlineUsers[i]['socketId'] = socketId
      newUser = false 
    }
  }
  if(newUser){
    onlineUsers.push({id, socketId})
  }
}

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}

const getUser = (id) => {
  return onlineUsers.find(user => user.id === id)
}


io.on('connection', (socket) => {
  socket.on('logged in', (user) => {
    addNewUser(user.user._id, socket.id)
    console.log(onlineUsers)
  })

  socket.on('logged out', (socketId) => {
    removeUser(socketId.socketId)
    console.log('Current Online users: ', onlineUsers)
  })

  socket.on('approve', async(place) => {
    const receiver = getUser(place.customer)
    await Notification.create({
      from: place.owner, to:place.customer, action:'approved', read:false, place: place.place
    })
    if(receiver){
      io.to(receiver.socketId).emit('notification', {
        notification:`${place.place} got approved!`
      })
    }
  })
  socket.on('pending', async(place) => {
    const receiver = getUser(place.customer)
    await Notification.create({
      from: place.owner, to:place.customer, action:'pending', read:false, place: place.place
    })
    if(receiver){
      io.to(receiver.socketId).emit('notification', {
        notification:`${place.place} got pending again!`
      })
    }
  })
  socket.on('cancel', async(place) => {
    const receiver = getUser(place.customer)
    await Notification.create({
      from: place.owner, to:place.customer, action:'cancel', read:false, place: place.place
    })
    if(receiver){
      io.to(receiver.socketId).emit('notification', {
        notification:`${place.place} got canceled!`
      })
    }
  })

  socket.on('disconnect', () => {
    console.log('Current Online users: ', onlineUsers)
  })
})

http.listen(4000, () => console.log(`Socket runing on port 4000`.bgBlue))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/media/places', express.static(__dirname + '/media/places'))

connectDB()

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/place', require('./routes/placeRoute'))
app.use('/api/home', require('./routes/homeRoute'))
app.use('/api/booking', require('./routes/bookingRoute'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started at port: ${port}`.black.bgCyan)
})