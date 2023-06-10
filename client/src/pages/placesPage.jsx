import {useEffect, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Perks from "../components/Perks"
import AddPhotos from "../components/AddPhotos"
import { addPlaces, getPlaces } from "../api/places"
import Types from '../components/Types'
import { ThreeDots } from  'react-loader-spinner'

const MyPlaces = () => {
  const [action, setAction] = useState()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [photos, setPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [photoLinks, setPhotoLinks] = useState([])
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState(new Date().toISOString().slice(0, 16))
  const [checkOut, setCheckOut] = useState(new Date().toISOString().slice(0, 16))
  const [maxGuests, setMaxGuests] = useState(1)
  const [bedrooms, setBedrooms] = useState(1)
  const [beds, setBeds] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [price, setPrice] = useState(1)
  const [types, setTypes] = useState([])

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const inputHeader = (header, description) => {
    return (
      <>
        <h2 className="text-[20px] mt-4">{header}</h2>
        <p className='text-gray-500'>{description}</p>
      </>
    )
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {
      title, address, photoLinks, description, perks, extraInfo, 
      checkIn, checkOut, maxGuests, bathrooms, beds, bathrooms, price, types
    }
    setLoading(true)
    const res = await addPlaces(photos, data)
    if(res['success']){
      setMessage(res['success'])
      setTitle(''); setAddress(''); setBathrooms(1); setBedrooms(1);
      setBeds(1); setCheckIn(new Date()); setCheckOut(new Date()); setDescription('');
      setExtraInfo(''); setMaxGuests(1); setMessage(''); setPerks([]); setPhotoLink('');
      setPhotoLinks([]); setPhotos([]); setPrice(1); setTypes([])
      setAction('')
    } else{
      setMessage(res['error'])
    }
    setLoading(false)
  }
  
  const handleGetPlaces = async() => {
    const res = await getPlaces()
    console.log(res)
    ////////////////////// NEXT: SHOW MY PLACES ///////////////////////
  }
  
  useEffect(() => {
    handleGetPlaces()
  }, [action])

  return (
    <div className="text-[15px]">
      {action != 'new' && (
        <div className="flex flex-col gap-2 items-center justify-center">
          <div onClick={() => setAction('new')} className="bg-brand py-2 text-white rounded-full flex w-[180px] items-center justify-center cursor-pointer"> 
            <AiOutlinePlus size={20} color={'#fff'}/> Add new place 
          </div>
          <div>
            /////////////////// SHOW MY PLACES ////////////////////////////
          </div>
        </div>
      )}
      {action == 'new' && (
        <div>
          <form className="flex flex-col gap-1">
            {inputHeader('Title', 'Title for your place, should be short and catchy')}
            <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="title, for example: My lovely apt"/>
            {inputHeader('Address', 'Address to this place')}
            <input required value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="address"/>
            {inputHeader('Photos', 'Add enough photos for better deal')}
            <AddPhotos 
              photoLink={photoLink} setPhotoLink={setPhotoLink}
              photos={photos} photoLinks={photoLinks} 
              setPhotos={setPhotos} setPhotoLinks={setPhotoLinks}
            />
            {inputHeader('Description', 'Description of the place')}
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} />
            {inputHeader('Perks', 'Select all the perks of your place')}
            <Perks perks={perks} setPerks={setPerks}/>
            {inputHeader('Extra info', 'House rules, etc')}   
            <textarea required value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
            {inputHeader('Check in & out times', 'Add check in and out time, number of maximum guests')}
            <div className="flex w-full gap-2 mt-2">
              <div className='w-full'>
                <h3 className='text-[15px]'>Check in time</h3>
                <input required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} type="datetime-local" />
              </div>
              <div className='w-full'>
                <h3 className='text-[15px]'>Check out time</h3>
                <input required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="datetime-local" />
              </div>
              <div className='w-full'>
                <h3 className='text-[15px]'>Max number of guest</h3>
                <input required value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} type="number" />
              </div>
            </div>
            {inputHeader('Rooms', 'Add how many bedrooms, beds and bathrooms your place has')}
            <div className="flex w-full gap-2 mt-2">
              <div className='w-full'>
                <h3 className='text-[15px]'>Bedrooms</h3>
                <input required value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} type="number" />
              </div>
              <div className='w-full'>
                <h3 className='text-[15px]'>Beds</h3>
                <input required value={beds} onChange={(e) => setBeds(e.target.value)} type="number" />
              </div>
              <div className='w-full'>
                <h3 className='text-[15px]'>Bathrooms</h3>
                <input required value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} type="number" />
              </div>
            </div>
            {inputHeader('Price', 'Add how much you will charge for the place')}
            <input required value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
            {inputHeader('Types', 'Add what type of place it is')}
            <Types types={types} setTypes={setTypes}/>
            <div className="flex w-full gap-2">
              <button type='submit' onClick={(e) => handleSubmit(e)} className="flex justify-center items-center
               bg-brand border-0 rounded-full px-4 py-2 text-white mt-2 w-full"> 
              {loading?<ThreeDots 
                height="12" color="#fff" ariaLabel="three-dots-loading" visible={true}/>
              : message != ''? message: 'Add place' } </button>
              <button type='button' onClick={(e) => {setAction('')}} className="bg-red-600 border-0 rounded-full px-4 py-2 text-white mt-2 w-2/4"> Cancel </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default MyPlaces