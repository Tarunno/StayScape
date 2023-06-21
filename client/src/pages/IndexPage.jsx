import { useEffect, useState } from "react"
import { getPlaces, savePlace, getSavedPlaces } from "../api/home"
import FilterType from "../components/Filter"
import { ThreeDots } from  'react-loader-spinner'
import {Link} from 'react-router-dom'

const BASE_URL =  'http://localhost:5000'

const IndexPage = ({isAuth}) => {

  const [places, setPlaces] = useState([])
  const [savedPlaces, setSavedPlaces] = useState([])

  const [type, setType] = useState('all')
  const [loading, setLoading] = useState(false)
  const [perks, setPerks] = useState([])
  const [filtered, setFiltered] = useState([])
  const [bedrooms, setBedrooms] = useState([0, 5])
  const [bathrooms, setBathrooms] = useState([0, 5])
  const [beds, setBeds] = useState([0, 5])
  const [guests, setGuests] = useState([0, 10])
  const [priceRange, setPriceRange] = useState([10, 500])

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
    setPlaces([])
    setSavedPlaces([])
    setLoading(true)
    const data = await getPlaces(type)
    const saved = await getSavedPlaces()

    if(data['error']){
      console.log('ERROR ', data['error']);
    }
    else{
      setPlaces(data)
      setFiltered(data)
      if(saved && saved.length > 0) setSavedPlaces(saved.map(saved => saved.place))
    }
    setLoading(false)
  }

  const handleFilter = async() => {
    setFiltered(places)
    let tempFiltered = places
    if(perks && perks.length > 0){
      tempFiltered = tempFiltered.filter((place) => perks.every(el => place.perks.includes(el)))
    }
    if(priceRange[0] != 10 || priceRange[1] != 500){
      tempFiltered = tempFiltered.filter((place) => place.price >= priceRange[0] && place.price <= priceRange[1])
    }
    if(beds[0] != 0 || beds[1] != 5){
      tempFiltered = tempFiltered.filter((place) => place.beds >= beds[0] && place.beds <= beds[1])
    }
    if(bedrooms[0] != 0 || bedrooms[1] != 5){
      tempFiltered = tempFiltered.filter((place) => place.bedrooms >= bedrooms[0] && place.bedrooms <= bedrooms[1])
    }
    if(bathrooms[0] != 0 || bathrooms[1] != 5){
      tempFiltered = tempFiltered.filter((place) => place.bathrooms >= bathrooms[0] && place.bathrooms <= bathrooms[1])
    }
    if(guests[0] != 0 || guests[1] != 10){
      tempFiltered = tempFiltered.filter((place) => place.guests >= guests[0] && place.guests <= guests[1])
    }
    setFiltered(tempFiltered)
  }

  const handleSave = async(id) => {
    const status = await savePlace(id)
    if(status['message'] == 'saved'){
      setSavedPlaces((savedPlaces) => [...savedPlaces, id])
    }
    else{
      setSavedPlaces((savedPlaces) => {
        let places = []
        for(let i=0; i<savedPlaces.length; i++){
          if(savedPlaces[i] !== id){
            places.push(savedPlaces[i])
          }
        }
        return places
      })
    }
  }

  useEffect(() => {
    handleFilter()
  }, [perks, beds, bedrooms, bathrooms, priceRange])

  useEffect(() => {
    handleGetPlaces()
  }, [isAuth])

  useEffect(() => {
    handleGetPlaces()
    setPerks([])
    setPriceRange([10, 500])
    setBedrooms([0, 5])
    setBathrooms([0, 5])
    setBeds([0, 5])
    setGuests([0, 10])
  }, [type])

  useEffect(() => {
    document.title = 'StayScape | Home'
    handleGetPlaces()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <div className='mt-2'>
        <FilterType 
          type={type} setType={setType} 
          places={places} setPlaces={setPlaces}
          perks={perks} setPerks={setPerks}
          bedrooms={bedrooms} setBedrooms={setBedrooms}
          bathrooms={bathrooms} setBathrooms={setBathrooms}
          beds={beds} setBeds={setBeds}
          guests={guests} setGuests={setGuests}
          priceRange={priceRange} setPriceRange={setPriceRange}
        />
      </div>
      <div className='grid z-0 grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4'>
      {loading && <ThreeDots height="12" color="#5617e8" ariaLabel="three-dots-loading" visible={true}/>}
        {filtered.map((place, index) => (
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
                <span>
                  <span className='font-semibold'>{'$' + place.price}</span>
                  <span className='font-normal'> per night </span>
                </span>
                {savedPlaces && savedPlaces.indexOf(place._id) !== -1 && 
                  <svg onClick={(e) => {
                    e.preventDefault()
                    handleSave(place._id)}
                    } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative z-10">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg> 
                  ||
                  <svg onClick={(e) => {
                    e.preventDefault()
                    handleSave(place._id)}
                    } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative z-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                }
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default IndexPage