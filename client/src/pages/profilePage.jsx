import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyPlaces from './placesPage';
import MyBookings from './bookingsPage';
import { getSavedPlaces, savePlace } from '../api/home';
import { getNotification, seenNotification } from '../api/booking';

const BASE_URL = 'http://localhost:5000/api/media/places/'


const ProfilePage = ({isAuth, setIsAuth, socket, notification, setNotification}) => {

  const [tab, setTab] = useState(0)
  const navigate = useNavigate()
  const [user, setUser] = useState(isAuth)
  const [savedPlaces, setSavedPlaces] = useState([])
  const [notificationsList, setNotificationsList] = useState([])

  const inputHeader = (header, description) => {
    return (
      <div>
        <h2 className="text-[20px]">{header}</h2>
        <p className='text-gray-500'>{description}</p>
      </div>
    )
  }

  const handleSavedPlaces = async() => {
    const saved = await getSavedPlaces()
    setSavedPlaces(saved)
  }

  const handleNotification = async() => {
    const res = await getNotification()
    setNotificationsList(res['notifications'])
  }

  const handleSeen = async(e, id) => {
    e.target.style.opacity = '0.5'
    await seenNotification(id)
  }

  useEffect(() => {
    setUser(isAuth)
    if (!isAuth) {
      navigate('/');
    }
    handleSavedPlaces()
    handleNotification()
    setNotification(false)
  }, [isAuth])

  useEffect(() => {
    handleNotification()
    if(tab === 0){
      setNotification(false)
    }
  }, [tab])

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
      {tab === 0 && <div className='w-full p-1 flex justify-center items-center flex-col gap-6'>
        <p>Logged in as <span className="text-brand font-bold">@{user.name}</span></p>
        <div className='grid grid-cols-[3fr_2fr] gap-4 w-full'>
          <div className='flex flex-col gap-4 w-full'>
            {inputHeader('Saved Places', 'Places you have saved')}
            <div className='grid grid-cols-3 gap-4 w-full'>
              {savedPlaces && savedPlaces.length > 0 && savedPlaces.map(place => (
                <Link to={'/place/' + place.place} key={place.place} className='flex gap-2 rounded-xl border shadow-lg p-2 w-full'>
                  <img src={BASE_URL + place.photos[0]} className='rounded-lg brightness-150 w-[80px] aspect-square object-cover'/>
                  <div className='w-full justify-between'>
                    <p className='text-[13px]'>{place.title}</p>
                    <svg onClick={async(e) => {
                        e.preventDefault()
                        await savePlace(place.place)
                        await handleSavedPlaces()
                      }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 hover:text-gray-500 transition-colors duration-150">
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-4  w-full'>
            {inputHeader('Notifications', 'Recent threads')}
            <div className='flex flex-col gap-3  w-full text-[13px]'>
              {notificationsList && notificationsList.length > 0 && notificationsList.map(notification => (
                <div key={notification._id} className='flex justify-between items-center w-full py-2 px-4 border rounded-xl shadow-lg cursor-pointer' 
                  onClick={(e) => handleSeen(e, notification._id)}
                  style={{opacity: notification.read? '0.5': '1'}}
                >
                <p className='pointer-events-none flex items-center gap-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-brand">
                    <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
                  </svg>
                  {notification.notification}
                </p>
              </div>))
              }
            </div>
          </div>
        </div>
      </div>}
      {tab === 1 && <div className='w-full p-1'>
        <MyBookings isAuth={isAuth} socket={socket}/>
      </div>}
      {tab === 2 && <div className='w-full p-1'>
        <MyPlaces/>
      </div>}
    </div>
  )
}

export default ProfilePage