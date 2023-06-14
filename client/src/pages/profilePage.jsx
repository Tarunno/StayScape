import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPlaces from './placesPage';
import MyBookings from './bookingsPage';


const ProfilePage = ({isAuth, setIsAuth}) => {

  const [tab, setTab] = useState(0)
  const navigate = useNavigate()
  const [user, setUser] = useState(isAuth)

  useEffect(() => {
    setUser(isAuth)
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth])

  useEffect(() => {
    document.title = 'StayScape | Profile'
  }, [])

  return (
    <div className='flex flex-col gap-4 items-center justify-center text-[15px]'>
      <div className='w-fit flex gap-4 bg-white items-center justify-center py-1 px-4 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <p className={tab===0?'selected flex gap-1':'flex gap-1 bg-gray-200 py-2 px-4 rounded-full'} onClick={() => setTab(0)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          My profile
        </p>
        <p className={tab===1?'selected flex gap-1':'flex gap-1 bg-gray-200 py-2 px-4 rounded-full'} onClick={() => setTab(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          My bookings
        </p>
        <p className={tab===2?'selected flex gap-1':'flex gap-1 bg-gray-200 py-2 px-4 rounded-full'} onClick={() => setTab(2)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
          My accommodations
        </p>
      </div>
      {tab === 0 && <div className='w-full p-1'>
        <p>Logged in as <span className="text-brand font-bold">@{user.name}</span></p>
      </div>}
      {tab === 1 && <div className='w-full p-1'>
        <MyBookings isAuth={isAuth}/>
      </div>}
      {tab === 2 && <div className='w-full p-1'>
        <MyPlaces/>
      </div>}
    </div>
  )
}

export default ProfilePage