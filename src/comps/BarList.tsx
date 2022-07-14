import {FC} from 'react'
import { IBar } from '../types/bars'
import BarItem from './BarItem';

interface BarListProps {
  bars: IBar[];
}

const BarList:FC<BarListProps> = ({bars}) => {
  return (
    <div>
      {
        !!bars.length &&
        bars.map(bar=>
          <BarItem key={bar.id} bar={bar} />
        )
      }
    </div>
  )
}

export default BarList