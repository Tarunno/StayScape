import {GrCar} from 'react-icons/gr'
import {TbDog} from 'react-icons/tb'
import {BsDoorClosed} from 'react-icons/bs'
import {IoRestaurantOutline} from 'react-icons/io5'
import {CgSmartHomeWashMachine} from 'react-icons/cg'

const Perks = ({perks, setPerks}) => {

  const handleCheckbox = (e) => {
    if(e.target.checked){
      setPerks((perks) => [...perks, e.target.name])
    }
    else{
      setPerks(perks.filter(perk => perk != e.target.name))
    }
  }

  return (
    <div className='grid gird-col-2 md:grid-cols-5 lg:grid-cols-6 gap-2'>
      <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
        <input name='Wifi' onClick={(e) => handleCheckbox(e)} type="checkbox" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
        <span>Wifi</span>
      </label>
      <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
        <input name='Free parking' onClick={(e) => handleCheckbox(e)} type="checkbox" />
        <GrCar size={21} style={{strokeWidth:"0.2"}}/>
        <span>Free&nbsp;parking</span>
      </label>
      <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
        <input name='TV' onClick={(e) => handleCheckbox(e)} type="checkbox" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
        </svg>
        <span>TV</span>
      </label>
      <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
        <input name='Private entrance' onClick={(e) => handleCheckbox(e)} type="checkbox" />
        <BsDoorClosed size={24} style={{strokeWidth:"0.1"}}/>
        <span>Private&nbsp;entrance</span>
      </label>
      <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
        <input name='Pet allowed' onClick={(e) => handleCheckbox(e)} type="checkbox" />
        <TbDog size={23} style={{strokeWidth:"1.6"}}/>
        <span>Pet&nbsp;allowed</span>
      </label> 
      <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
        <input name='Kitchen' onClick={(e) => handleCheckbox(e)} type="checkbox" />
        <IoRestaurantOutline size={22} style={{strokeWidth:"2"}}/>
        <span>Kitchen</span>
      </label>
      <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
        <input name='Washer' onClick={(e) => handleCheckbox(e)} type="checkbox" />
        <CgSmartHomeWashMachine size={24} style={{strokeWidth:"0.1"}}/>
        <span>Washer</span>
      </label>
    </div>   
  )
}

export default Perks