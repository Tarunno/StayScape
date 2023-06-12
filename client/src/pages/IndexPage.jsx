import { useEffect, useState } from "react"
import { getPlaces } from "../api/home"
import FilterType from "../components/Filter"
import { ThreeDots } from  'react-loader-spinner'

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
      setPlaces(data['places'])
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
          <div key={index} className='hover:cursor-pointer card-hover'>
            <div className='overflow-hidden rounded-xl'>
              <img 
                src={BASE_URL + '/api/media/places/' + place.photos[0]}
                className='rounded-xl aspect-square object-cover'
              />
            </div> 
            <div className='py-2'>
              <h1 className='font-bold truncate'>{handleAddressFormat(place.address)}</h1>
              <h2 className='text-[13px] text-gray-800 truncate font-normal'>{place.title}</h2>
              <p className='flex text-[13px] text-gray-800 truncate font-normal'>
                {handleDateFormat(place.checkIn, place.checkOut)}
              </p>
              <p className='text-[15px]'>
                <span className='font-semibold'>{'$' + place.price}</span>
                <span className='font-normal'> per night </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndexPage