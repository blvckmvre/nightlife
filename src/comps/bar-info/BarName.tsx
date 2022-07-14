import {FC} from 'react'

interface BarNameProps {
    name: string;
} 

const BarName:FC<BarNameProps> = ({name}) => {
  return (
    <p className='bar-name'>{name}</p>
  )
}

export default BarName