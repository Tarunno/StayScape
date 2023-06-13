import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import IndexPage from "./pages/IndexPage";
import { isAuthenticate } from "./api/auth";
import { useEffect, useState } from 'react';
import ProfilePage from './pages/profilePage';
import SinglePlace from './pages/singlePage';


const App = () => {

  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(isAuthenticate())
  }, [])
   
  return (
    <div className='font-sans font-medium'>
      <Header isAuth={isAuth} setIsAuth={setIsAuth}/>
      <div className='px-7 py-2 max-w-[1510px] m-auto'>
        <Routes>
          <Route path='/' element={<IndexPage  isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/profile' element={<ProfilePage isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route path='/place/:id' element={<SinglePlace isAuth={isAuth} setIsAuth={setIsAuth} />} />
        </Routes>
      </div>
    </div> 
  );
}

export default App;
