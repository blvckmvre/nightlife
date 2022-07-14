import {FC} from 'react'
import { IBarLocation } from '../../types/bars'

interface BarLocationProps {
  location: IBarLocation;
}

const BarLocation:FC<BarLocationProps> = ({location}) => {
  return (
    <p>{location.city}, {location.address1}</p>
  )
}

export default BarLocation