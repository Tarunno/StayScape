import { useEffect, useState } from "react"
import {GrCar} from 'react-icons/gr'
import {TbDog} from 'react-icons/tb'
import {BsDoorClosed} from 'react-icons/bs'
import {IoRestaurantOutline} from 'react-icons/io5'
import {CgSmartHomeWashMachine} from 'react-icons/cg'


const FilterType = ({
  type, setType, 
  perks, setPerks,
  bedrooms, setBedrooms
  }) => {

  const [showFilter, setShowFilter] = useState(false)
  const [filter, setFilter] = useState(0)

  const inputHeader = (header, description) => {
    return (
      <>
        <h2 className="text-[20px] mt-4">{header}</h2>
        <p className='text-gray-500'>{description}</p>
      </>
    )
  }

  const handleCheckbox = (e) => {
    if(e.target.checked){
      setPerks((perks) => [...perks, e.target.name])
    }
    else{
      setPerks(perks.filter(perk => perk != e.target.name))
    }
  }

  useEffect(() => {
    if(perks) setFilter(perks.length)
  }, [perks])

  return (
    <div className="text-[15px]">
      <ul className='flex w-full justify-between gap-2'>
        <li className='cursor-pointer border rounded-xl w-full px-6 py-4 flex items-center gap-2' onClick={() => setType('all')} style={{border: type === 'all'? '2px solid #111': ''}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>
          All
        </li>
        <li className='cursor-pointer border rounded-xl w-full px-6 py-4 flex items-center gap-2' onClick={() => setType('House')} style={{border: type === 'House'? '2px solid #111': ''}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          House
        </li>
        <li className='cursor-pointer border rounded-xl w-full px-6 py-4 flex items-center gap-2' onClick={() => setType('Guesthouse')} style={{border: type === 'Guesthouse'? '2px solid #111': ''}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
          </svg>
          Guest&nbsp;house
        </li>
        <li className='cursor-pointer border rounded-xl w-full px-6 py-4 flex items-center gap-2' onClick={() => setType('Apartment')} style={{border: type === 'Apartment'? '2px solid #111': ''}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
          Apartment
        </li>
        <li className='cursor-pointer border rounded-xl w-full px-6 py-4 flex items-center gap-2' onClick={() => setType('Hotel')} style={{border: type === 'Hotel'? '2px solid #111': ''}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
          Hotel
        </li>
        <li className='w-[200px] cursor-pointer bg-gray-100 border rounded-xl px-6 py-4 flex items-center gap-2' 
          onClick={() => setShowFilter(true)}
          style={{border: filter != 0? '2px solid #111': ''}}>
          {filter != 0 && <p className='relative top-[-25px] left-[-28px] bg-black text-[11px] rounded-full aspect-square flex items-center justify-center h-5 w-5 min-h-5 min-w-5 text-white'>{filter}</p>}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{marginLeft: filter !== 0 ?"-30px":null}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filter
        </li>
      </ul>
      {showFilter && 
        <div className="fixed flex flex-col gap-4 left-0 top-0 w-[100vw] bg-white
        min-h-[100vh] h-[100%] z-20 overflow-y-scroll slide-up p-5">
          <div onClick={() => setShowFilter(false)} className='flex fixed right-4 justify-end items-center p-2 cursor-pointer'>
            <div className='flex items-center justify-center p-2 border bg-white rounded-full w-[100px] shadow-md hover:shadow-lg transition-all duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6 mt-20'>
            <div className='p-4 border shadow-xl rounded-xl min-h-[200px] h-full'>
              {inputHeader('Perks', 'Select perks you want in places')}
              <div className='grid gird-col-2 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2'>
                <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
                  <input checked={perks.includes('Wifi')} name='Wifi' onChange={(e) => handleCheckbox(e)} type="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                  </svg>
                  <span>Wifi</span>
                </label>
                <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
                  <input checked={perks.includes('Free parking')} name='Free parking' onChange={(e) => handleCheckbox(e)} type="checkbox" />
                  <GrCar size={21} style={{strokeWidth:"0.2"}}/>
                  <span>Free&nbsp;parking</span>
                </label>
                <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
                  <input checked={perks.includes('TV')} name='TV' onChange={(e) => handleCheckbox(e)} type="checkbox" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <span>TV</span>
                </label>
                <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
                  <input checked={perks.includes('Private entrance')} name='Private entrance' onChange={(e) => handleCheckbox(e)} type="checkbox" />
                  <BsDoorClosed size={24} style={{strokeWidth:"0.1"}}/>
                  <span>Private&nbsp;entrance</span>
                </label>
                <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
                  <input checked={perks.includes('Pet allowed')} name='Pet allowed' onChange={(e) => handleCheckbox(e)} type="checkbox" />
                  <TbDog size={23} style={{strokeWidth:"1.6"}}/>
                  <span>Pet&nbsp;allowed</span>
                </label> 
                <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
                  <input checked={perks.includes('Kitchen')} name='Kitchen' onChange={(e) => handleCheckbox(e)} type="checkbox" />
                  <IoRestaurantOutline size={22} style={{strokeWidth:"2"}}/>
                  <span>Kitchen</span>
                </label>
                <label className='border rounded-xl p-4 flex gap-2 items-center justify-start cursor-pointer'>
                  <input checked={perks.includes('Washer')} name='Washer' onChange={(e) => handleCheckbox(e)} type="checkbox" />
                  <CgSmartHomeWashMachine size={24} style={{strokeWidth:"0.1"}}/>
                  <span>Washer</span>
                </label>
              </div>
            </div>
            <div className='p-4 border shadow-xl rounded-xl min-h-[200px] h-full'>
              {inputHeader('Rooms', 'Select number of rooms')}
              ////////////////////// NEXT: FILTER by BEDROOMS //////////////////////////
            </div>
            <div className='p-4 border shadow-xl rounded-xl min-h-[200px] h-full'>

            </div>
            <div className='p-4 border shadow-xl rounded-xl min-h-[200px] h-full'>
              
            </div>
          </div>
        </div>}
    </div>
  )
}

export default FilterType