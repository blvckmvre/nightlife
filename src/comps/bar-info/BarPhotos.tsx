import {FC} from 'react'

interface BarPhotosProps {
  photos: string[];
}

const BarPhotos:FC<BarPhotosProps> = ({photos}) => {
  return (
    <>
      {photos.map(photo=>
        <img className='bar-img' key={photo} src={photo} alt="" />
      )}
    </>
  )
}

export default BarPhotos