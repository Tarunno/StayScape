import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import IndexPage from "./pages/IndexPage";
import { isAuthenticate } from "./api/userAuth";
import { useEffect, useState } from 'react';

const App = () => {

  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    setIsAuth(isAuthenticate())
  }, [isAuth])
  
  return (
    <div className='font-sans'>
      <Header isAuth={isAuth} setIsAuth={setIsAuth}/>
      <div className='mt-[-220px] z-10 p-5'>
        <Routes>
          <Route path='' element={<IndexPage  isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
        </Routes>
      </div>
    </div> 
  );
}

export default App;
