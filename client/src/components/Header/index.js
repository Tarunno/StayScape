import { FiSearch, FiUser, FiAlignJustify } from "react-icons/fi";


const Header = () => {
  return (
    <div 
      className='bg-color4 fixed w-full top-0 w p-4 flex justify-between items-start z-10 bg-cover bg-top h-80'
      style={{ backgroundImage: `url('/bg.png')` }}
      >
      <div className='flex text-white gap-1 text-[25px] bg-color2 bg-opacity-40 backdrop-blur-sm border items-center border-gray-300 rounded-full py-1 px-4'>
        🌷<span className='font-bold text-[20px] pt-2'>BreezeBnB</span>
      </div>


      <div className='flex gap-2 text-white backdrop-blur-sm bg-color2 bg-opacity-40 items-center border border-gray-300 rounded-full py-1 px-4'>
        <div>Anywhere</div>
        <div className='border-1 border-l border-gray-300 h-5'></div>
        <div>Any week</div>
        <div className='border-1 border-l border-gray-300 h-5'></div>
        <div>Add guests</div>
        <button className='bg-color3 rounded-full p-2 mr-[-11px]'>
          <FiSearch size={22} color="white"/>
        </button>
      </div>

      <div className='flex gap-2 text-white backdrop-blur-sm bg-color2 bg-opacity-40 items-center border border-gray-300 rounded-full py-1 px-4'>
        <FiAlignJustify size={22} color="white"/>
        <button className='bg-color3 rounded-full p-2 mr-[-11px]'>
          <FiUser size={22} color="white"/>
        </button>
      </div>
    </div> 
  )
}

export default Header