import { useState } from "react"
import {BsFacebook} from 'react-icons/bs'
import {AiFillGoogleCircle, AiFillApple} from 'react-icons/ai'
import {MdOutlineAlternateEmail} from 'react-icons/md'
import Message from "./Message"
import {Authenticate, isAuthenticate} from '../api/userAuth'

const Modal = ({setShowModal, type, setIsAuth}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e, action) => {
    e.preventDefault()
    const cardinals = {
      name,
      email, 
      password
    }
    const data = await Authenticate(cardinals, action)

    if(data['message'] === undefined){
      setMessage({
        type: 'success',
        payload: action + ' successful!'
      })
      await setIsAuth(isAuthenticate)
    }
    else{
      setMessage({
        type: 'error',
        payload: data['message']
      })
    }
  }

  return (
    <div>
      <div onClick={() =>  setShowModal(false)} className='cursor-pointer z-10 w-full fixed top-0 left-0 flex justify-center items-center h-full bg-gray-800 backdrop-blur-sm bg-opacity-20'>
      </div>
      <div className='fixed z-20 p-5 flex flex-col gap-2 bg-color4 text-black w-[500px] rounded-lg' style={{
          boxShadow: '4px 4px 28px 1px rgba(0, 0, 0, 0.2)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        <div className='flex flex-col'>
          <h1 className='w-full text-center '>{type}</h1>
          <div className='w-full h-[1px] bg-color1 my-5'></div>
          <Message message={message}/>
          <div className="overflow-y-scroll h-[400px]"> 
            {type === 'Sign up' ?
              <form onSubmit={(e) => handleSubmit(e, type)} className='flex flex-col gap-1'>
                <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className='hover:border-color2 transition-all duration-300'/>
                <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className='hover:border-color2 transition-all duration-300'/>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className='hover:border-color2 transition-all duration-300'/>
                <button type="submit" className='primary'>{type}</button>
              </form>: null
            }
            {type === 'Log in' ?
              <form onSubmit={(e) => handleSubmit(e, type)} className='flex flex-col gap-1'>
                <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className='hover:border-color2 transition-all duration-300'/>
                <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className='hover:border-color2 transition-all duration-300'/>
                <button type="submit" className='primary'>{type}</button>
              </form>: null
            }
            <div className="w-full h-[1px] bg-color1 flex justify-center my-6">
              <span className="bg-color4 relative z-30 mt-[-12px] px-2 text-color2">or</span>
            </div>
            <div className='flex flex-col gap-1 justify-between'>
              <button className='oauth'>
                <BsFacebook size={22} color={'#4267B2'}/>
                <p className='text-center w-full'>Continue with Facebook</p>
              </button>
              <button className='oauth'>
                <AiFillGoogleCircle size={22} color={'#DB4437'}/>
                <p className='text-center w-full'>Continue with Google</p>
              </button>
              <button className='oauth'>
                <AiFillApple size={22} color={'gray'}/>
                <p className='text-center w-full'>Continue with Appple</p>
              </button>
              <button className='oauth'>
                <MdOutlineAlternateEmail size={22}/>
                <p className='text-center w-full'>Continue with Email</p>
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Modal