import { useEffect, useState } from "react"
const BASE_URL = 'http://localhost:5000/api/media/places/'


const AddPhotos = ({photoLinks, setPhotoLinks, photos, setPhotos, photoLink, setPhotoLink}) => {

  const [displayPhotos, setDisplayPhotos] = useState([])

  const display = (photos) => {
    setDisplayPhotos([])
    for(let i=0; i<photos.length; i++){
      try{
        const reader = new FileReader()
        reader.readAsDataURL(photos[i])
        reader.onload = async (e) => {
          const fileContent = e.target.result;
          setDisplayPhotos((displayPhotos) => [...displayPhotos, fileContent]);
        }
      }
      catch(err){
        setDisplayPhotos((displayPhotos) => [...displayPhotos, BASE_URL + photos[i]])
      }
    }
  }

  const uploadPhoto = (e) => {
    const files = e.target.files
    for(let i=0; i<files.length; i++){
      setPhotos((photos) => [...photos, files[i]])
    }
  }

  const handleMainImage = (link) => {
    setPhotos((photos) => [link.replace(BASE_URL, ''), ...photos.filter(name => name !== link.replace(BASE_URL, ''))])
  }

  const handleRemoveImage = (link) => {
    console.log(link);
    let links = []
    for(let i=0; i<photos.length; i++){
      if(photos[i] != link.replace(BASE_URL, '')){
        links.push(photos[i])
      }
    }
    setPhotos(links)
  }

  const handleRemoveLink = (link) => {
    let links = []
    for(let i=0; i<photoLinks.length; i++){
      if(photoLinks[i] != link){
        links.push(photoLinks[i])
      }
    }
    setPhotoLinks(links)
  }

  useEffect(() => {
    display(photos)
  }, [photos])

  return (
    <div className="flex flex-col">
      <div className='flex justify-center gap-1 items-center'>
        <input value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} type="text" placeholder="Add using a link ....jpg"/>
        <button className='bg-gray-200 px-4 h-[45px] rounded-2xl' onClick={(e) => {
          e.preventDefault()
          if(photoLink != '') setPhotoLinks([...photoLinks, photoLink])
          setPhotoLink('')
        }}> Add&nbsp;photo</button>
        <button className='bg-red-300 px-4 h-[45px] rounded-2xl' onClick={(e) => {
          e.preventDefault()
          setPhotos([])
          setDisplayPhotos([])
          setPhotoLinks([])
        }}>Reset</button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2 w-full'> 
          {displayPhotos.map((link, index) => (
            <div key={index} className="h-[100px] w-full rounded-2xl ml-1 overflow-hidden" style={{background: `url(${link}) no-repeat center center/cover`}}>
              {link === displayPhotos[0] && (
                <div className='float-left m-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 bg-black text-white p-1 opacity-70 rounded-xl hover:cursor-pointer">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              {link !== displayPhotos[0] && (
                <div onClick={() => handleMainImage(link)} className='float-left m-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-black text-white p-1 opacity-70 rounded-xl hover:cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
              )}
              <div onClick={() => handleRemoveImage(link)} className='float-right m-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-black text-white p-1 opacity-70 rounded-xl hover:cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
            </div>
          ))}
          {photoLinks.map((link, index) => (
            <div key={index} className="h-[100px] w-full rounded-2xl ml-1 overflow-hidden" style={{background: `url(${link}) no-repeat center center/cover`}}>
              <div className='float-left m-1'>
                <div className="w-[29px] h-[2px] opacity-70 bg-white relative rounded-xl top-[15px] z-10 rotate-45"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-black text-white p-1 opacity-70 rounded-xl hover:cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div onClick={() => handleRemoveLink(link)} className='float-right m-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 bg-black text-white p-1 opacity-70 rounded-xl hover:cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
            </div>
          ))}
          <div>
            <label className='border bg-transparent rounded-2xl text-2xl text-gray-500 flex justify-center items-center h-[100px] w-full mx-1 cursor-pointer'>
              <input required onChange={uploadPhoto} type="file" multiple className='hidden'/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <span className='font-normal'>Upload</span>
            </label>
          </div>
        </div>
    </div>
  )
}

export default AddPhotos