import {FC} from 'react'

interface BarDistanceProps {
    distance: number;
}

const BarDistance:FC<BarDistanceProps> = ({distance}) => {
  return (
    <p>This location is {Math.round(distance)}m far from you</p>
  )
}

export default BarDistance