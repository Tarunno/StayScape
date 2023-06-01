import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import IndexPage from "./pages/IndexPage";
import { isAuthenticate } from "./api/userAuth";
import { useEffect, useState } from 'react';
import ProfilePage from './pages/profilePage';

const App = () => {

  const [isAuth, setIsAuth] = useState(false)

  const handleAuth = () => {
    setIsAuth(isAuthenticate())
  }

  useEffect(() => {
    handleAuth()
  }, [])
   
  return (
    <div className='font-sans'>
      <Header isAuth={isAuth} setIsAuth={setIsAuth}/>
      <div className='px-6 py-2'>
        <Routes>
          <Route path='/' element={<IndexPage  isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/profile' element={<ProfilePage isAuth={isAuth} setIsAuth={setIsAuth}/>} />
        </Routes>
      </div>
    </div> 
  );
}

export default App;
