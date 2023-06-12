import { useState } from "react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BASE_URL = 'http://localhost:5000'

const MyPlace = ({place, handleEdit}) => { 

  return (
    <div className='flex gap-4 p-4 bg-gray-100 w-full rounded-xl mb-4 cursor-pointer' id={place._id} onClick={(e) => handleEdit(place._id)}>
      <img className='h-[300px] w-[300px] object-cover rounded-xl' src={BASE_URL + '/api/media/places/' + place.photos[0]} />
      <div className='flex flex-col items-start gap-4'>
        <h1 className='text-2xl'>{place.title}</h1>
        <p className='flex justify-center items-center gap-1 text-gray-800 font-normal mt-[-15px] text-[13px]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>        
          {place.address}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
          {new Date(place.checkIn).toISOString().slice(0,16).replace('T', ' ')} 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
          {new Date(place.checkOut).toISOString().slice(0,16).replace('T', ' ')}
        </p>
        <div className='flex flex-col'>
          <div className='font-normal'>
           <ReactMarkdown
              className='h-[180px] overflow-hidden markdown'
              children={place.description}
              remarkPlugins={[remarkGfm]}
              escapeHtml={false}
            />
          </div>
          <p className='mt-[-140px] h-[140px] bg-gradient-to-t from-gray-100 to-white-0'></p>
          <div className='mt-[20px]'>
            {place.perks.map(perk => (
              <p className='inline bg-brand py-2 px-3 rounded-full mr-1 text-white font-normal text-[13px]'>{perk}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPlace