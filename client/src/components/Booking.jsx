import { useState } from "react";
const BASE_URL = 'http://localhost:5000/api/media/places/'


const Booking = ({booking, place, owner, type, customer, handleApprove}) => {

  const handleDate = (checkIn, checkOut) => {
    let tempCheckIn = new Date(checkOut)
    let tempCheckOut = new Date(checkIn)
    if(tempCheckIn.getMonth() == tempCheckOut.getMonth()){
      return Math.abs(tempCheckOut.getDate() - tempCheckIn.getDate())
    }
    else{
      return Math.abs(30 - tempCheckIn.getDate() + tempCheckOut.getDate() 
                + (tempCheckOut.getMonth() - tempCheckIn.getMonth() - 1) * 30)
    }
  }

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

  if(type === 'MyBooking'){
    return ( 
      <div className='border rounded-xl shadow-xl py-6 px-6 h-full bg-white flex flex-col justify-between'>
        <div>
          <div className='flex gap-4'>
            <img src={BASE_URL + place.photos[0]} className='w-24 h-24 rounded-lg object-cover'/>
            <div className='flex flex-col justify-between'>
              <div>
                <p className='text-[13px] font-thin'>{place.types[0]}</p>
                <p>{place.title}</p>
              </div>
            </div>
          </div>
          <p className='flex text-[13px] items-center gap-2 border-b pb-4 mt-4'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className='ml-[-7px]'>4.5</span>&#8226;<span className='underline'> 201&nbsp;reviews </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="4 w-4 h-4">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className='ml-[-7px] underline truncate'><a target="blank" href={'https://www.google.com/maps/place/' + place.address}>{place.address}</a></span>
          </p>
          <div className="w-full mt-2 flex flex-col gap-4">
            <h1 className='text-[22px] mt-2'>Booking details</h1>
            <span>
              <p>Booked for {handleDate(booking.checkIn, booking.checkOut)} nights</p>
              <p className='font-normal text-[13px]'>{handleDateFormat(booking.checkIn, booking.checkOut)}</p>
            </span>
            <span>
              <p>Paid {booking.due == 0? '(full)': 'half'} of ${booking.cost} </p> <p className='text-[13px] text-red-700'>Due: {booking.due}</p>
              {booking.due !== 0? <p className='font-normal text-[13px]'>*please pay the due charges on {handleDateFormat(booking.checkIn).split('-')[0]}</p>:null}
            </span>
          </div>
        </div>
        <span className='py-2'>
          {booking.approved? <p className='flex gap-1 items-center text-green-700'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            approved
            </p>: <p className='flex gap-1 items-center text-yellow-700'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            pending
          </p> }
        </span>
      </div>
    )
  }
  else{
    return (
      <div className='border rounded-xl shadow-xl py-6 px-6 h-full bg-white flex flex-col justify-between overflow-hidden'>
        <div>
          <div className='flex gap-4'>
            <img src={BASE_URL + place.photos[0]} className='w-24 h-24 rounded-lg object-cover'/>
            <div className='flex flex-col justify-between'>
              <div>
                <p className='text-[13px] font-thin'>{place.types[0]}</p>
                <p>{place.title}</p>
              </div>
            </div>
          </div>
          <p className='flex text-[13px] items-center gap-2 border-b pb-4 mt-4'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className='ml-[-7px]'>4.5</span>&#8226;<span className='underline'> 201&nbsp;reviews </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="4 w-4 h-4">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className='ml-[-7px] underline truncate'><a target="blank" href={'https://www.google.com/maps/place/' + place.address}>{place.address}</a></span>
          </p>
          <div className="w-full mt-2 flex flex-col gap-4">
            <h1 className='text-[22px] mt-2'>Booking details</h1>
            <span>
              <p>Booked for {handleDate(booking.checkIn, booking.checkOut)} nights</p>
              <p className='font-normal text-[13px]'>{handleDateFormat(booking.checkIn, booking.checkOut)}</p>
            </span>
            <span className='pb-1'>
              <p>Paid {booking.due == 0? '(full)': 'half'} of ${booking.cost} </p> <p className='text-[13px] text-red-700'>Due: {booking.due}</p>
              {booking.due !== 0? <p className='font-normal text-[13px]'>*please collect the due charges on {handleDateFormat(booking.checkIn).split('-')[0]}</p>:null}
            </span>
          </div>
        </div>
        <span className='mt-3 pt-2 flex flex-col border-t gap-2'>
            <p className='text-[22px] pb-1'>Customer Info</p>
            <p className='text-[13px] text-brand items-center justify-start flex gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              {booking.phone} ({customer.name})
            </p>
            <p className='text-[13px] text-brand items-center justify-start flex gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
              </svg>
              {customer.email}
            </p>
          </span>
          <span className='px-6 py-4 bg-gray-100 border-t-2 border-dotted border-gray-400 m-[-25px] mt-4 flex'>
          {booking.approved? <p className='flex gap-1 items-center text-green-700'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            approved 
            <button onClick={() => handleApprove(booking._id, 'pending')} className='text-[13px] ml-3 flex gap-1 items-center text-white bg-yellow-600 px-4 py-2 rounded-full'>
              pending
            </button>
            <button onClick={() => handleApprove(booking._id, 'cancel')} className='text-[13px] ml-0 flex gap-1 items-center text-white bg-red-700 px-4 py-2 rounded-full'>
              Cancel
            </button>
            </p>: <p className='flex gap-1 items-center text-yellow-700'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            pending
            <button onClick={() => handleApprove(booking._id, 'approve')} className='text-[13px] ml-3 flex gap-1 items-center text-white bg-green-500 px-4 py-2 rounded-full'>
              Approve
            </button>
            <button onClick={() => handleApprove(booking._id, 'cancel')} className='text-[13px] ml-0 flex gap-1 items-center text-white bg-red-700 px-4 py-2 rounded-full'>
              Cancel
            </button>
          </p> }
        </span>
      </div>
    )
  }
}

export default Booking