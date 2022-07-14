import {FC} from 'react'

interface BarIsWorkingProps {
  is_closed: boolean;
}

const BarIsWorking:FC<BarIsWorkingProps> = ({is_closed}) => {
  return is_closed 
    ? 
    <p className='is-closed'>Not working</p>
    :
    <p className='is-open'>Working</p>
}

export default BarIsWorking