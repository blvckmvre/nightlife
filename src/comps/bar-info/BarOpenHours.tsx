import {FC} from 'react'
import { IHours } from '../../types/bars'

interface BarOpenHoursProps {
    hours: IHours;
}

const BarOpenHours:FC<BarOpenHoursProps> = ({hours}) => {

    const convertDay = (i: number) => {
        return [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ][i];
    }

    const convertTime = (time: string) => {
        return time.substring(0,2)+":"+time.substring(2);
    }
    return (
        <>
            <p>Open Hours: </p>
            {hours.open.map(day=>
                <div>
                    {convertDay(day.day)}. {convertTime(day.start)} – {convertTime(day.end)}
                </div>
            )}
            {hours.is_open_now ? 
                <p className='is-open'>Open now</p> : 
                <p className='is-closed'>Closed now</p>
            }
        </>
    )
}

export default BarOpenHours