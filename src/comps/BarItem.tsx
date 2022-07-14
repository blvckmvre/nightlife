import {FC} from 'react'
import { useNavigate } from 'react-router-dom';
import { IBar } from '../types/bars'
import BarDistance from './bar-info/BarDistance';
import BarLocation from './bar-info/BarLocation';
import BarName from './bar-info/BarName';
import BarPhotos from './bar-info/BarPhotos';
import BarRating from './bar-info/BarRating';
import BarUsersCount from './bar-info/BarUsersCount';
import Btn from './ui/btn/Btn';

interface BarItemProps {
    bar: IBar;
}

const BarItem:FC<BarItemProps> = ({bar}) => {
    const router = useNavigate();
    return (
        <div className='bar-wrapper'>
            <BarName name={bar.name} />
            <BarPhotos photos={[bar.image_url]} />
            <BarLocation location={bar.location} />
            <BarDistance distance={bar.distance} />
            <BarRating rating={bar.rating} />
            <BarUsersCount count={bar.users} />
            <Btn onClick={()=>router("/"+bar.id)}>Show</Btn>
        </div>
  )
}

export default BarItem