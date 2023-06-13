import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlace } from "../api/places"
import { ThreeDots } from  'react-loader-spinner'
import {GrCar} from 'react-icons/gr'
import {TbDog} from 'react-icons/tb'
import {BsDoorClosed} from 'react-icons/bs'
import {IoRestaurantOutline} from 'react-icons/io5'
import {CgSmartHomeWashMachine} from 'react-icons/cg'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const BASE_URL = 'http://localhost:5000/api/media/places/'


const SinglePlace = ({isAuth, setIsAuth}) => {
  const {id} = useParams()
  const [place, setPlace] = useState(null)
  const [showPhotos, setShowPhotos] = useState(false)
  const [owner, setOwner] = useState()
  const [checkIn, setCheckIn] = useState()
  const [checkOut, setCheckOut] = useState()
  const [guests, setGuests] = useState(1)
  const [nights, setNights] = useState(1)

  const [cost, setCost] = useState(0)
  const [totalCost, setTotalCost] = useState(21)
  const [due, setDue] = useState(0)

  const [booking, setBooking] = useState(false)
  const [paymentOption, setPaymentOption] = useState('full')

  const handleGetPlace = async (id) => {
    const res = await getPlace(id)
    const resPlace = res['place']
    const owner = res['owner']
    setPlace(resPlace)
    setOwner(owner)
  }

  const handleBooking = () => {
    console.log('------------------------------');
    console.log('CUSTOMER: ', isAuth._id);
    console.log('PLACE: ', place._id);
    console.log('CHECKIN: ', checkIn);
    console.log('CHECKOUT: ', checkOut);
    console.log('GUESTS: ', guests);
    console.log("COST: ", totalCost);
    console.log("DUE: ", due);
    console.log('----------------------------------');
  }

  useEffect(() => {
    document.title = 'StayScape | Booking'
    handleGetPlace(id)
  }, [id])

  useEffect(() => {
    if(place){
      setCheckIn(new Date(place.checkIn).toISOString().slice(0, 10))
      setCheckOut(new Date(place.checkOut).toISOString().slice(0, 10))
      setGuests(place.maxGuests)
    }
  }, [place])

  useEffect(() => {
    if(place){
      setCost(place.price * nights)
      setTotalCost(21 + cost)
    }
  }, [nights])

  useEffect(() => {
    if(place){
      setTotalCost(21 + cost)
    }
  }, [cost])

  useEffect(() => {
    setNights(new Date(checkOut).getDate() - new Date(checkIn).getDate())
  }, [checkIn, checkOut])

  if(!place){
    return (
      <div>
        <ThreeDots height="12" color="#5617e8" ariaLabel="three-dots-loading" visible={true}/>
      </div>
    )
  }
  
  return (
    <div className='mt-1 flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-[27px] font-normal'>{place.title}</h1>
        <div className='flex justify-between items-start'>
          <p className='flex text-[13px] items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className='ml-[-7px]'>4.5</span>&#8226;<span className='underline'> 201 reviews </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className='ml-[-7px] underline'><a target="blank" href={'https://www.google.com/maps/place/' + place.address}>{place.address}</a></span>
          </p>
          <p className='flex text-[13px] items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
            </svg>
            <span className='ml-[-7px]'>Share</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span className='ml-[-7px]'>Save</span>
          </p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 overflow-hidden rounded-2xl h-[410px]">
          <img src={BASE_URL + place.photos[0]} className='h-full object-cover hover:brightness-[.9]'/>
          <div className='flex flex-col gap-2 h-[410px]'>
            <img src={BASE_URL + place.photos[1]} className='object-cover h-1/2 hover:brightness-[.9]'/>
            <img src={BASE_URL + place.photos[2]} className='object-cover h-1/2 hover:brightness-[.9]'/>
          </div>
          <div className='flex flex-col gap-2 h-[410px]'>
            <img src={BASE_URL + place.photos[3]} className='object-cover h-1/2 hover:brightness-[.9]'/>
            {place.photos[4] && 
             <img src={BASE_URL + place.photos[4]} className='object-cover h-1/2 hover:brightness-[.9]'/>
            } 
            {!place.photos[4] && 
             <img src={place.photoLinks[0]} className='object-cover h-1/2 hover:brightness-[.9]'/>
            }
          </div>
        </div>
        <div onClick={() => setShowPhotos(!showPhotos)} className='flex gap-1 mt-[-55px] mr-3 bg-gray-100 w-[150px] p-2 rounded-xl relative float-right cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          See all photos
        </div>
      </div>
      {showPhotos &&
        <div className="fixed flex flex-col gap-4 left-0 top-0 w-[100vw] bg-black
        min-h-[100vh] h-[100%] z-20 overflow-y-scroll slide-up p-5">
          <div onClick={() => setShowPhotos(false)} className='flex fixed right-4 justify-end items-center p-2 cursor-pointer'>
            <div className='flex items-center justify-center p-2 border text-[#f4f4f4] bg-[#111] rounded-full w-[100px]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </div>
          </div>
          <div className='fixed bottom-5 w-full flex justify-center text-[#f4f4f4]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 p-2 rounded-xl border shadow-xl bg-[#111] opacity-70 jump">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <div className='flex flex-col gap-3 mt-3 select-none'>
            {place.photos.map((photo, index) => (
              <img key={index} src={BASE_URL + photo} className="max-w-[900px] w-full m-auto aspect-auto rounded-xl"/>
            ))}
            {place.photoLinks.map((photo, index) => (
              <img key={index} src={photo} className="max-w-[900px] w-full m-auto aspect-auto rounded-xl"/>
            ))}
          </div>
        </div>
      }
      <div className='grid grid-cols-[5fr_2fr] mt-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex text-[20px] gap-1 justify-between mr-10 border-b pb-4'>
            <div>
              <p>{place.types[0]} posted by {owner.name}</p>
              <p className='text-[15px] font-normal' >{place.maxGuests} guests &#8226; {place.bedrooms} bedrooms &#8226; {place.beds} beds &#8226; {place.bathrooms} bathrooms</p>
            </div>
            <div className="bg-gray-500 rounded-full text-white border-2 border-gray-500 h-[45px]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 relative bottom-[-6px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
          <div className='py-2 flex w-full gap-2 text-[15px] pr-10 flex-wrap'>
            {place.perks.map((perk, index) => (
              (perk === 'Wifi' && <div key={index} className='flex gap-1 px-6 py-4 border rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
              <span>Wifi</span></div>) 
              ||
              (perk === 'Free parking' && <div key={index} className='flex gap-1 px-6 py-4 border rounded-lg'>
              <GrCar size={21} style={{strokeWidth:"0.2"}}/>
              <span>Free&nbsp;parking</span></div>) 
              ||
              (perk === 'TV' && <div key={index} className='flex gap-1 px-6 py-4 border rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <span>TV</span></div>)
              ||
              (perk === 'Private entrance' && <div key={index} className='flex gap-1 px-6 py-4 border rounded-lg'>
              <BsDoorClosed size={24} style={{strokeWidth:"0.1"}}/>
              <span>Private entrance</span></div>)
              ||
              (perk === 'Pet allowed' && <div key={index} className='flex gap-1 px-6 py-4 border rounded-lg'>
              <TbDog size={23} style={{strokeWidth:"1.6"}}/>
              <span>Pet allowed</span></div>)
              ||
              (perk === 'Kitchen' && <div key={index} className='flex gap-1 px-6 py-4 border rounded-lg'>
              <IoRestaurantOutline size={22} style={{strokeWidth:"2"}}/>
              <span>Kitchen</span></div>)
              ||
              (perk === 'Washer' && <div key={index} className='flex gap-1 px-6 py-4 border rounded-lg'>
              <CgSmartHomeWashMachine size={24} style={{strokeWidth:"0.1"}}/>
              <span>Washer</span></div>)
            ))}
          </div>
          <div className='font-normal mr-10 border-b pb-2'>
            <p className='text-[25px] font-medium py-2'> Description </p>
            <ReactMarkdown
                className='markdown text-[15px]'
                children={place.description}
                remarkPlugins={[remarkGfm]}
                escapeHtml={false}
              />
          </div>
          <div className='font-normal mr-10'>
            <p className='text-[25px] font-medium py-2'> Extra Info </p>
            <ReactMarkdown
                className='markdown text-[15px]'
                children={place.extraInfo}
                remarkPlugins={[remarkGfm]}
                escapeHtml={false}
              />
          </div>
        </div>
        <div className="sticky flex flex-col items-center top-10 h-[400px] w-full border rounded-2xl p-4 shadow-xl">
          <div className='flex justify-between items-center w-full pb-4'>
            <h1 className='text-[20px]'>${ place.price} <span className='text-[15px] font-normal'>night</span></h1>
            <div className='flex items-center justify-center text-[13px]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              <span>4.5</span> &nbsp; &#8226; &nbsp; <span className="font-normal" > 201 reviews </span>
            </div>
          </div>
          <div className='flex text-[15px] font-normal border border-gray-400 rounded-t-lg overflow-hidden w-full'> 
            <div className='w-full'>
              <p className='font-semibold text-[11px] pt-2 px-2' style={{borderRight: '1px solid gray'}}>CHECK IN</p>
              <input style={{
                margin: '0px', border: 'none', borderRight: '1px solid gray', borderRadius: '0px', outline: 'none',  width: '100%', paddingRight: '10px', padding: '0px 5px 5px 5px'
                }} type="date" min={new Date(place.checkIn).toISOString().slice(0, 10)} max={new Date(place.checkOut).toISOString().slice(0, 10)} value={checkIn}
                onChange={async (e) => {
                  setCheckIn(e.target.value)
                }}
              />
            </div>
            <div className='w-full'>
              <p className='font-semibold text-[11px] pt-2 px-2'>CHECK OUT</p>
              <input style={{margin: '0px', border: 'none', outline: 'none', width: '100%', padding: '0px 5px 5px 5px'}} type="date" min={new Date(place.checkIn).toISOString().slice(0, 10)} 
                max={new Date(place.checkOut).toISOString().slice(0, 10)} value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value)
                }}
              />
            </div>
          </div>
          <div className='select-none flex flex-col text-[15px] font-normal border border-t-0 border-r-1 border-b-1 border-l-1 border-gray-400 rounded-b-lg overflow-hidden w-full'>
            <p className='font-semibold text-[11px] px-2 pt-2'>GUESTS </p>
            <span className='flex justify-between items-center pr-2'>
              <span className='px-2 font-normal'> {guests} <span className='font-normal'>guests</span></span>
              <span className='flex pb-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setGuests(Math.max(guests-1, 1))
                    }}
                  >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setGuests(Math.min(guests+1, place.maxGuests))
                    }}
                  >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </span>
          </div>
          <div className="w-full mt-4 pb-4">
            <button className='bg-gradient-to-r from-brand to-[#9432d1] text-white w-full p-3 rounded-lg'
           onClick={() => setBooking(true)} > Reserve </button>
            <span className='w-full flex justify-between items-center mt-6'>
              <p className='font-normal text-[15px]' >${place.price} x {nights} nights</p>
              <p className='font-normal text-[15px]' >${cost}</p>
            </span>
            <span className='w-full flex justify-between items-center mt-3'>
              <p className='font-normal text-[15px]s'>StayScape fee</p>
              <p className='font-normal text-[15px]' >$21</p>
            </span>
          </div>
          {booking &&
            <div className="fixed flex flex-col gap-4 left-0 top-0 w-[100vw] bg-white
            min-h-[100vh] h-[100%] z-20 overflow-y-scroll slide-up p-5">
              <div onClick={() => setBooking(false)} className='flex fixed right-4 justify-end items-center p-2 cursor-pointer'>
                <div className='flex items-center justify-center shadow-md hover:shadow-lg p-2 border bg-white rounded-full w-[100px]'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </div>
              </div>
              <div className="px-20 py-16">
                <h1 className='text-[40px] font-normal flex items-center gap-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                  Confirm and pay
                </h1>
                <div className='grid grid-cols-2 gap-6'>
                  <div>
                    <h1 className='text-[22px] mt-4'>Stay</h1>
                    <p className='text-[15px] font-thin'>
                      From <span className='font-medium'> {checkIn} </span> to <span className='font-medium'>{checkOut}</span></p>
                    <h1 className='text-[22px] mt-4'>Guests</h1>
                    <p className='text-[15px] font-thin border-b pb-4'>{guests} guests</p>
                    <div>
                      <h1 className='text-[22px] mt-4'>Chose how to pay</h1>
                      <div className='flex justify-between items-center border border-b-0 mt-2 p-4 rounded-t-xl cursor-pointer' style={{
                          border: paymentOption === 'full'? '2px solid #111': null  
                        }}
                        onClick={() => {
                          setPaymentOption('full')
                          setDue(0)
                        }}
                        > 
                        <span>
                          <p>Pay full</p>
                          <p className='text-[15px] font-normal'>Pay the total ({totalCost}) now and you're all set.</p>
                        </span>
                        {paymentOption === 'full' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        }
                        {paymentOption === 'half' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        }
                      </div>
                      <div className='flex justify-between items-center border border-t-0 p-4 rounded-b-xl cursor-pointer' style={{
                          border: paymentOption === 'half'? '2px solid #111': null  
                        }}
                        onClick={() => {
                          setPaymentOption('half')
                          setDue(totalCost / 2)
                        }}
                        > 
                        <span>
                          <p>Pay part now, part later</p>
                          <p className='text-[15px] font-normal'>${totalCost / 2} due today, ${totalCost / 2} on {checkIn}. No extra fees.</p>
                        </span>
                        {paymentOption === 'full' && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        }
                        {paymentOption === 'half' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        }
                      </div>
                    </div>
                  </div>
                  <div className='border mt-[-50px] rounded-xl shadow-xl pt-6 px-6 pb-1 h-fit'>
                    <div className='flex gap-4 border-b pb-6'>
                      <img src={BASE_URL + place.photos[0]} className='w-24 h-24 rounded-lg object-cover'/>
                      <div className='flex flex-col justify-between'>
                        <div>
                          <p className='text-[13px] font-thin'>{place.types[0]}</p>
                          <p>{place.title}</p>
                        </div>
                        <p className='flex text-[13px] items-center gap-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          <span className='ml-[-7px]'>4.5</span>&#8226;<span className='underline'> 201 reviews </span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          <span className='ml-[-7px] underline'><a target="blank" href={'https://www.google.com/maps/place/' + place.address}>{place.address}</a></span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <h1 className='text-[22px] mt-2'>Price details</h1>
                      <span className='w-full flex justify-between items-center mt-4'>
                        <p className='font-normal text-[15px]' >${place.price} x {nights} nights</p>
                        <p className='font-normal text-[15px]' >${cost}</p>
                      </span>
                      <span className='w-full flex justify-between items-center mt-3 mb-6'>
                        <p className='underline font-normal text-[15px]s'>StayScape fee</p>
                        <p className='underline font-normal text-[15px]' >$21</p>
                      </span>
                      <span className='py-4 flex w-full items-center justify-between border-t'>
                        <p className='font-medium text-[15px]s'>Total</p>
                        <p className='font-medium text-[15px]' >${totalCost}</p>
                      </span>
                      {paymentOption === 'half' && <div>
                        <span className='flex flex-col text-red-700 w-full items-start justify-between border-t py-4'>
                          <span className='flex w-full justify-between items-center pb-2'>
                            <p className='font-medium text-[15px]s'>Due now</p>
                            <p className='font-medium text-[15px]' >${due}</p>
                          </span>
                          <span className='flex w-full justify-between items-center pb-2'>
                            <p className='font-normal text-[15px]s'>Due on <span className='underline'>{checkIn}</span></p>
                            <p className='font-normal text-[15px]' >${due}</p>
                          </span>
                        </span>
                      </div>
                      }
                    </div>
                  </div>
                </div>
                <button className='bg-gradient-to-r from-brand to-[#9432d1] text-white w-full p-3 mt-6 rounded-lg'
                  onClick={() => handleBooking()} > Book Now! </button>
              </div>
            </div>
            }
          <span className='pt-4 flex w-full items-center justify-between border-t border-gray-400'>
            <p className='font-medium text-[15px]s'>Total</p>
            <p className='font-medium text-[15px]' >${totalCost}</p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SinglePlace