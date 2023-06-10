import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import {Logout} from "../api/auth"
import { useNavigate } from "react-router-dom";
import {BiHomeHeart} from 'react-icons/bi'

const Header = ({isAuth, setIsAuth}) => {

  const navigate = useNavigate()    
  const [showUserOptions, setShowUserOptions] = useState(false) 
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('Sign up')

  return (
    <div>
      <div className='px-6 py-4 w-full flex justify-between border border-b'>
        <Link to='/' className='flex gap-1 text-[25px] items-center hover:cursor-pointer'>
          <span className='flex font-bold text-brand text-[24px] justify-center items-center'> 
            <BiHomeHeart size={35} className='mt-[-5px]'/>
            StayScape 
          </span>
        </Link>
        <div className='flex text-[15px] shadow-md gap-4 items-center border border-gray-300 rounded-full px-7 py-1 hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out'>
          <div >Anywhere</div>
          <div className='border-1 border-l border-gray-300 h-6'></div>
          <div>Any week</div>
          <div className='border-1 border-l border-gray-300 h-6'></div>
          <div>Add guests</div>
          <button className='bg-brand rounded-full p-1 mr-[-15px] text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        <div onClick={() => setShowUserOptions(!showUserOptions)} className='text-black flex px-2 justify-center items-center text-[15px] shadow-md border border-gray-300 rounded-full hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-[-5px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <button className='text-black rounded-full p-2 mr-[-3px] ml-1 flex items-center justify-center gap-1'>
            <div className="bg-gray-500 rounded-full text-white border-2 border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative bottom-[-4px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            {isAuth?isAuth.name:""}
          </button>

          {!showUserOptions? null:
            <div className='flex flex-col gap-3 bg-white text-black absolute top-[65px] right-[5px] z-10 p-5 w-[250px] rounded-lg' style={{boxShadow: '4px 4px 28px 1px rgba(0, 0, 0, 0.2)'}}>
              {isAuth?
                <ul>
                  <Link to='/profile'><li className='p-2 transition-all duration-300 rounded-lg hover:bg-[#f4f4f4]'>Profile</li></Link>
                  <li onClick={async () => {
                    Logout()
                    await setIsAuth(false)
                    navigate('/')
                  }} className='p-2 text-red-500 transition-all duration-300 rounded-lg hover:bg-[#f4f4f4]'>Log out</li>
                </ul>
                :
                <div>
                  <ul>
                    <li onClick={() => {
                      setShowModal(!showModal)
                      setModalType('Sign up')
                    }} className='p-2 transition-all duration-300 rounded-lg font-medium hover:bg-[#f4f4f4]'>Sign up</li>
                    <li onClick={() => {
                      setShowModal(!showModal)
                      setModalType('Log in')
                    }} className='p-2 transition-all duration-300 rounded-lg hover:bg-[#f4f4f4]'>Log in</li>
                  </ul>
                </div>
              }
              <div className='w-[250px] ml-[-20px] h-[1px] bg-gray-400 opacity-50 rounded-full'></div>
              <ul>
                <li className='p-2 transition-all duration-300 rounded-lg hover:bg-[#f4f4f4]'>Scape your home</li>
                <li className='p-2 transition-all duration-300 rounded-lg hover:bg-[#f4f4f4]'>Help</li>
              </ul>
            </div>
          }

        </div>
      </div> 
      {!showModal? null :
       <Modal setShowModal={setShowModal} type={modalType} setIsAuth={setIsAuth}/>
      }
    </div>
  )
}

export default Header