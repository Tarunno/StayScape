import { useEffect, useState } from "react";
import { FiSearch, FiUser, FiAlignJustify } from "react-icons/fi";
import {FaFly} from 'react-icons/fa'
import { Link } from "react-router-dom";
import Modal from "./Modal";
import {Logout} from "../api/userAuth"
import { useNavigate } from "react-router-dom";

const Header = ({isAuth, setIsAuth}) => {

  const navigate = useNavigate()    
  const [showUserOptions, setShowUserOptions] = useState(false) 
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('Sign up')

  return (
    <div>
      <div className='px-6 py-2 w-full flex justify-between border border-b'>
        <Link to='/' className='flex gap-1 text-[25px] items-center hover:cursor-pointer'>
          <span className='flex items-center font-bold text-brand text-[24px]'> <FaFly size={42}/> breezebnb</span>
        </Link>
        <div className='flex text-[15px] shadow-sm gap-4 items-center border border-gray-300 rounded-full px-7 py-1 hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out'>
          <div >Anywhere</div>
          <div className='border-1 border-l border-gray-300 h-6'></div>
          <div>Any week</div>
          <div className='border-1 border-l border-gray-300 h-6'></div>
          <div>Add guests</div>
          <button className='bg-brand rounded-full p-2 mr-[-22px]'>
            <FiSearch size={20} color="white"/>
          </button>
        </div>
        <div onClick={() => setShowUserOptions(!showUserOptions)} className='text-brand flex px-2 justify-center items-center text-[15px] shadow-sm border border-gray-300 rounded-full hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out'>
          <FiAlignJustify size={20}/>
          <button className='bg-brand text-white rounded-full p-2 mr-[-3px] ml-1 flex'>
            <FiUser size={20}/>
            {isAuth?isAuth.name:"Log in"}
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
                <li className='p-2 transition-all duration-300 rounded-lg hover:bg-[#f4f4f4]'>Breeze your home</li>
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