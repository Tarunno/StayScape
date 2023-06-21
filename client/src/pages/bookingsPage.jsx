import { useEffect, useState } from "react"
import { getBookings, getBooked, approveBooking } from "../api/booking"
import { ThreeDots } from  'react-loader-spinner'
import Booking from "../components/Booking"
import { Link } from "react-router-dom"


const MyBookings = ({isAuth, socket}) => {

  const [bookings, setBookings] = useState([])
  const [places, setPlaces] = useState([])
  const [owners, setOwners] = useState([])

  const [gotBooked, setGotBooked] = useState([])
  const [bookedPlaces, setBookedPlaces] = useState([])
  const [bookedOwners, setBookedOwners] = useState([])
  const [customers, setCustomers] = useState([])

  const [loading, setLoading] = useState(false)
  const [loading_2, setLoading_2] = useState(false)

  const inputHeader = (header, description) => {
    return (
      <>
        <h2 className="text-[20px] mt-4">{header}</h2>
        <p className='text-gray-500'>{description}</p>
      </>
    )
  }

  const handleGetBookings = async () => {
    setLoading(true)
    const bookings = await getBookings()
    if(bookings['error']){
      console.log('ERROR: ', bookings['error'])
    }
    else{
      setBookings(bookings['bookings'])
      setPlaces(bookings['places'])
      setOwners(bookings['owners'])
    }
    setLoading(false)
  }

  const handleGetBooked = async () => {
    setLoading_2(true)
    const bookings = await getBooked()
    if(bookings['error']){
      console.log('ERROR: ', bookings['error'])
    }
    else{
      setGotBooked(bookings['bookings'])
      setBookedPlaces(bookings['places'])
      setBookedOwners(bookings['owners'])
      setCustomers(bookings['customers'])
    }
    setLoading_2(false)
  }

  const handleApprove = async (id, action, customer, owner, place) => {
    await approveBooking(id, action)
    console.log(socket);
    if(socket){
      socket.emit(action, {
        user:isAuth.usename, 
        place, 
        customer, 
        owner
      })
    }
    handleGetBooked()
  }

  useEffect(() => {
    handleGetBookings()
    handleGetBooked()
  }, [])
 
  return(
    <div>
      {inputHeader('My bookings', 'Places you have booked')}
      {bookings.length === 0 && loading && <div className='mt-4'>
        <ThreeDots height="12" color="#5617e8" ariaLabel="three-dots-loading" visible={true}/>
      </div>}
      <div className="grid gap-4 grid-cols-1 grid-flow-row md:grid-cols-3 lg:grid-cols-3 mt-2 pb-4">
        {!loading && bookings.length === 0 && <p className='flex gap-1 p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          No bookings yet!</p>
        }
        {bookings && bookings.map((booking, index) => (
          <Link key={index} to={'/place/' + places[index]._id}>
            <Booking booking={booking} place={places[index]} owner={owners[index]} type={'MyBooking'} />
          </Link>
        ))}
      </div>
      {inputHeader('Got booked', 'You places that got booked')}
      {gotBooked.length === 0 && loading_2 && <div className='mt-4'>
        <ThreeDots height="12" color="#5617e8" ariaLabel="three-dots-loading" visible={true}/>
      </div>}
      <div className="grid gap-4 grid-cols-1 grid-flow-row md:grid-cols-3 lg:grid-cols-3 mt-2 pb-4">
        {!loading_2 && gotBooked.length === 0 && <p className='flex gap-1 p-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          No places got boooked yet!</p>
        }
        {bookings && gotBooked.map((booking, index) => (
          <Booking 
            booking={booking} 
            place={bookedPlaces[index]} 
            owner={bookedOwners[index]} 
            customer={customers[index]} 
            type={'MyBooked'} 
            handleApprove={handleApprove} />
        ))}
      </div>    
    </div>
  )
}

export default MyBookings