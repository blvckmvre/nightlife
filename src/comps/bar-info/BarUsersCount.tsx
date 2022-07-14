import {FC} from 'react'

interface BarUsersCountProps {
    count: number;
}

const BarUsersCount:FC<BarUsersCountProps> = ({count}) => {
  return (
    <p>{count} user(s) are going there tonight</p>
  )
}

export default BarUsersCount