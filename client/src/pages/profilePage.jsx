import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiList, FiKey } from "react-icons/fi";


const ProfilePage = ({isAuth, setIsAuth}) => {

  const [tab, setTab] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuth){
      navigate('/')
    }
  }, [isAuth])

  useEffect(() => {
    const tabMap = {0:'profile', 1:'bookings', 2:'accommodation'}
    console.log('Called ', tabMap[tab])
  }, [tab])

  return (
    <div className='flex flex-col gap-4 items-center justify-center text-[15px]'>
      <div className='w-fit flex gap-4 bg-white items-center justify-center border border-gray-300 rounded-full py-1 px-4 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <p className={tab===0?'selected flex gap-1':'flex gap-1'} onClick={() => setTab(0)}><FiUser size={20}/>My profile</p>
        <div className='border-1 border-l border-gray-300 h-6'></div>
        <p className={tab===1?'selected flex gap-1':'flex gap-1'} onClick={() => setTab(1)}><FiList size={20}/>My bookings</p>
        <div className='border-1 border-l border-gray-300 h-6'></div>
        <p className={tab===2?'selected flex gap-1':'flex gap-1'} onClick={() => setTab(2)}><FiKey size={20}/>My accommodations</p>
      </div>
      {tab === 0 && <div className='w-full p-6 bg-[#f4f4f4]'>
        <h1>My profile</h1>
      </div>}
      {tab === 1 && <div className='w-full p-6 bg-[#f4f4f4]'>
        <h1>My bookings</h1>
      </div>}
      {tab === 2 && <div className='w-full p-6 bg-[#f4f4f4]'>
        <h1>My accomodations</h1>
      </div>}
    </div>
  )
}

export default ProfilePage