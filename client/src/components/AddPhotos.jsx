import { useEffect, useState } from "react"

const AddPhotos = ({photoLinks, setPhotoLinks, photos, setPhotos, photoLink, setPhotoLink}) => {

  const [displayPhotos, setDisplayPhotos] = useState([])

  const display = (photos) => {
    setDisplayPhotos([])
    for(let i=0; i<photos.length; i++){
      const reader = new FileReader()
      reader.readAsDataURL(photos[i])
      reader.onload = async (e) => {
        const fileContent = e.target.result;
        setDisplayPhotos((displayPhotos) => [...displayPhotos, fileContent]);
      }
    }
  }

  const uploadPhoto = (e) => {
    const files = e.target.files
    for(let i=0; i<files.length; i++){
      setPhotos((photos) => [...photos, files[i]])
    }
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
          {photoLinks.map((link, index) => (
            <div key={index} className="h-[100px] w-full rounded-2xl ml-1 overflow-hidden" style={{background: `url(${link}) no-repeat center center/cover`}}>
            </div>
          ))}
          {displayPhotos.map((link, index) => (
            <div key={index} className="h-[100px] w-full rounded-2xl ml-1 overflow-hidden" style={{background: `url(${link}) no-repeat center center/cover`}}>
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