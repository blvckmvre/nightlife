import {FC} from 'react'
import starIcon from "../../assets/star.svg"

interface BarRatingProps {
    rating: number;
}

const BarRating:FC<BarRatingProps> = ({rating}) => {
  return (
    <p style={{display: "flex", alignItems: "center", gap: "5px"}}>
      Rating: {rating} 
      <img width={25} src={starIcon} />
    </p>
  )
}

export default BarRating