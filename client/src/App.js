import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import IndexPage from "./pages/IndexPage";
import { isAuthenticate } from "./api/auth";
import { useEffect, useState } from 'react';
import ProfilePage from './pages/profilePage';
import SinglePlace from './pages/singlePage';
import {io} from 'socket.io-client'
import { getNotification } from './api/booking';


const App = () => {

  const [isAuth, setIsAuth] = useState(false)
  const [socket, setSocket] = useState(null)
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    setIsAuth(isAuthenticate())
    setSocket(io('http://localhost:4000'))
  }, [])

  const handleNotification = async () => {
    const notification = await getNotification()
    if(notification['notifications'] && notification['notifications'].length > 0){
      setNotification(true)
    }
  }

  useEffect(() => {
    if(socket){
      console.log('Websocket is connected...');
      if(isAuth){
        socket.emit('logged in', {user: isAuthenticate()})
        handleNotification()
      }
      else{
        socket.emit('logged out', ({socketId:socket.id}))
      }
    }
  }, [isAuth, socket])
   
  return (
    <div className='font-sans font-medium'>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} socket={socket} notification={notification} setNotification={setNotification}/>
      <div className='px-7 py-2 max-w-[1510px] m-auto pt-[87px]'>
        <Routes>
          <Route path='/' element={<IndexPage  isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/profile' element={<ProfilePage isAuth={isAuth} 
            setIsAuth={setIsAuth} 
            socket={socket} 
            setNotification={setNotification} notification={notification}
            />} 
          />
          <Route path='/place/:id' element={<SinglePlace isAuth={isAuth} setIsAuth={setIsAuth} />} />
        </Routes>
      </div>
    </div> 
  );
}

export default App;
