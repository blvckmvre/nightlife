import {FC} from 'react'

interface BarPriceProps {
    price: string;
}

const BarPrice:FC<BarPriceProps> = ({price}) => {
  return (
    <p>Price: {price}</p>
  )
}

export default BarPrice