import {FC} from 'react'

interface BarPhoneProps {
    display_phone: string;
}

const BarPhone:FC<BarPhoneProps> = ({display_phone}) => {
  return (
    <p>Phone: {display_phone}</p>
  )
}

export default BarPhone