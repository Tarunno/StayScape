import { useEffect, useState } from "react"
import { getPlaces } from "../api/home"
import FilterType from "../components/Filter"
import { ThreeDots } from  'react-loader-spinner'
import {Link} from 'react-router-dom'

const BASE_URL =  'http://localhost:5000'

const IndexPage = () => {

  const [places, setPlaces] = useState([])
  const [type, setType] = useState('all')
  const [loading, setLoading] = useState(false)

  const handleDateFormat =(checkIn, checkOut) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dateCheckIn = new Date(checkIn)
    const dateCheckOut = new Date(checkOut)
    const dayCheckIn = dateCheckIn.getDate()
    const monthCheckIn = dateCheckIn.getMonth()
    const yearCheckIn = dateCheckIn.getFullYear()
    const dayCheckOut = dateCheckOut.getDate()
    const monthCheckOut = dateCheckOut.getMonth()
    const yearCheckOut= dateCheckOut.getFullYear()

    let resIn = dayCheckIn + ' '
    let resOut = dayCheckOut + ' '
    let output = ''

    if(monthCheckIn === monthCheckOut){
      output += monthNames[monthCheckIn-1] + ' ' + resIn + ' - ' + resOut
    }
    else{
      output += monthNames[monthCheckIn-1] + ' ' + resIn + ' - ' + 
                monthNames[monthCheckOut-1] + ' ' + resOut 
    }

    if(yearCheckIn !== yearCheckOut){
      output = yearCheckIn + ' ' + output + ' ' + yearCheckOut
    }

    return output
  }

  const handleAddressFormat = (address) => {
    return address.split(',').at(-2) + ', ' + address.split(',').at(-1)
  }

  const handleGetPlaces = async() => {
    setLoading(true)
    const data = await getPlaces()
    if(data['error']){
      console.log('ERROR ', data['error']);
    }
    else{
      setPlaces(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    document.title = 'StayScape | Home'
    handleGetPlaces()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <div className='mt-2'>
        <FilterType type={type} setType={setType}/>
      </div>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4'>
      {loading && <ThreeDots height="12" color="#5617e8" ariaLabel="three-dots-loading" visible={true}/>}
        {places.map((place, index) => (
          <Link to={'/place/' + place._id} key={index} className='hover:cursor-pointer card-hover'>
            <div className='overflow-hidden rounded-xl'>
              <img 
                src={BASE_URL + '/api/media/places/' + place.photos[0]}
                className='rounded-xl aspect-square object-cover overflow-hidden'
              />
            </div> 
            <div className='py-2'>
              <div className='flex justify-between items-center'>
                <h1 className='font-bold truncate'>{handleAddressFormat(place.address)}</h1>
                <p className='flex text-[13px] items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  4.5
                </p>
              </div>
              <h2 className='text-[13px] text-gray-800 truncate font-normal'>{place.title}</h2>
              <p className='flex text-[13px] text-gray-800 truncate font-normal'>
                {handleDateFormat(place.checkIn, place.checkOut)}
              </p>
              <p className='text-[15px] flex justify-between items-center'>
                <div>
                  <span className='font-semibold'>{'$' + place.price}</span>
                  <span className='font-normal'> per night </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default IndexPage