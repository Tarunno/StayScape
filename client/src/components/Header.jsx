import { useEffect, useState } from "react";
import { FiSearch, FiUser, FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import {Logout} from "../api/userAuth"
import { isAuthenticate } from "../api/userAuth";

const Header = ({isAuth, setIsAuth}) => {

  const [showUserOptions, setShowUserOptions] = useState(false) 
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('Sign up')

  useEffect(() => {
    setIsAuth(isAuthenticate())
  }, [isAuth])

  return (
    <div>
      <div className='flex justify-between items-center h-13 bg-color2 p-5 text-color4'>
        <h1 className='font text-[22px]'>Introducing BreezeBnB Rooms and 50+ features</h1>
        <div>
          <div className='flex justify-between items-center h-8 gap-2 font-light text-sm'>
            <img className='h-full rounded-md' src="https://a0.muscache.com/im/pictures/420c6e43-7896-4617-9ff4-ad05eb1f03f8.jpg?im_q=highq&im_w=240" alt="learn more"/>
            <p>Watch the Rooms film</p>
            <div className='border-1 border-l border-gray-300 h-5'></div>
            <p>Learn more</p>
          </div>
        </div>
      </div> 
      <div 
        className='bg-color4 w-full p-4 flex justify-between items-start bg-cover bg-top h-80'
        style={{ backgroundImage: `url('/bg.png')` }}
        >
        <Link to='/' className='flex text-color4 gap-1 text-[25px] bg-color2 bg-opacity-40 backdrop-blur-sm border items-center border-gray-300 rounded-full py-1 px-4 hover:cursor-pointer hover:bg-color3 hover:bg-opacity-40 transition-all duration-300 ease-in-out'>
          🌷<span className='font-bold text-[20px] pt-2' style={{textShadow: '1px 1px 5px gray'}}>BreezeBnB</span>
        </Link>


        <div className='flex gap-2 text-color4 backdrop-blur-sm bg-color2 bg-opacity-40 items-center border border-gray-300 rounded-full py-1 px-4 hover:cursor-pointer hover:bg-color3 hover:bg-opacity-40 transition-all duration-300 ease-in-out'>
          <div style={{textShadow: '1px 1px 4px gray'}} >Anywhere</div>
          <div className='border-1 border-l border-gray-300 h-5'></div>
          <div style={{textShadow: '1px 1px 2px gray'}} >Any week</div>
          <div className='border-1 border-l border-gray-300 h-5'></div>
          <div style={{textShadow: '1px 1px 2px gray'}} >Add guests</div>
          <button className='bg-color3 rounded-full p-2 mr-[-11px]'>
            <FiSearch size={22} color="white"/>
          </button>
        </div>

        <div onClick={() => setShowUserOptions(!showUserOptions)} className='flex gap-2  text-color4 backdrop-blur-sm bg-color2 bg-opacity-40 items-center border border-gray-300 rounded-full py-1 px-4 hover:cursor-pointer hover:bg-color3 hover:bg-opacity-40 transition-all duration-300 ease-in-out'>
          <FiAlignJustify size={22} color="white" style={{textShadow: '1px 1px 5px gray'}}/>
          <button className='bg-color3 rounded-full p-2 mr-[-11px]'>
            <FiUser size={22} color="white"/>
          </button>

          {!showUserOptions? null:
            <div className='flex flex-col gap-2 bg-color4 text-black absolute top-[50px] right-[5px] z-10 p-5 w-[250px] rounded-lg' style={{boxShadow: '4px 4px 28px 1px rgba(0, 0, 0, 0.2)'}}>
              {isAuth?
                <ul>
                  <li onClick={() => {
                    Logout()
                    setIsAuth(false)
                  }} className='p-2 text-red-700 transition-all duration-300'>Log out</li>
                </ul>
                :
                <div>
                  <ul>
                    <li onClick={() => {
                      setShowModal(!showModal)
                      setModalType('Sign up')
                    }} className='p-2 hover:text-color2 transition-all duration-300'>Sign up</li>
                    <li onClick={() => {
                      setShowModal(!showModal)
                      setModalType('Log in')
                    }} className='p-2 hover:text-color2 transition-all duration-300'>Log in</li>
                  </ul>
                </div>
              }
              <div className='w-full h-[1px] bg-color1'></div>
              <ul>
                <li className='p-2 hover:text-color2 transition-all duration-300'>Breeze your home</li>
                <li className='p-2 hover:text-color2 transition-all duration-300'>Help</li>
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