import {FC} from 'react'
import { useParams } from 'react-router-dom'
import BarIsWorking from '../comps/bar-info/BarIsWorking';
import BarLocation from '../comps/bar-info/BarLocation';
import BarName from '../comps/bar-info/BarName';
import BarOpenHours from '../comps/bar-info/BarOpenHours';
import BarPhone from '../comps/bar-info/BarPhone';
import BarPhotos from '../comps/bar-info/BarPhotos';
import BarPrice from '../comps/bar-info/BarPrice';
import BarRating from '../comps/bar-info/BarRating';
import BarUsers from '../comps/bar-info/BarUsers';
import Btn from '../comps/ui/btn/Btn';
import LoadingGlobal from '../comps/ui/loading/global/LoadingGlobal';
import LoadingLocal from '../comps/ui/loading/local/LoadingLocal';
import { useTypeSelector } from '../hooks/redux-hooks';
import { barAPI } from '../store/reducers/barApi';

const BarPage:FC = () => {
    const {bar_id} = useParams();
    const {userData, isLoggedIn} = useTypeSelector(state=>state.auth);

    const username = userData ? userData.username : "";

    const {data: bar, isFetching, error} = barAPI.useGetDetailsQuery(bar_id!);
    const [addUserToBar, {isLoading: addLoading, error: addError}] = barAPI.useAddUserMutation();
    const [rmUserFromBar, {isLoading: rmLoading, error: rmError}] = barAPI.useRmUserMutation();

    const addMe = (bar_id: string, username: string) => {
        if(!isLoggedIn)
            return alert("! This action requires authorization !");
        addUserToBar({bar_id, username})
    }
    const removeMe = (bar_id: string, username: string) => {
        if(!isLoggedIn)
            return alert("! This action requires authorization !");
        rmUserFromBar({bar_id, username})
    }
    return (
        <div className='app-wrapper'>
        {isFetching && <LoadingGlobal />}
        {error && <p className='error-info'>{JSON.stringify(error)}</p>}
        {bar &&
            <div className='bar-wrapper'>
                {(addLoading || rmLoading) && <LoadingLocal />}
                {(addError || rmError) &&
                    <p className='error-info'>{JSON.stringify(addError || rmError)}</p>
                }
                {(!bar.users || !bar.users.includes(username)) &&
                    <Btn additionalClasses='apply-btn' onClick={()=>addMe(bar.id,username)}>
                        I want to go there!
                    </Btn>
                }
                {(bar.users && bar.users.includes(username)) &&
                    <Btn additionalClasses='apply-btn' onClick={()=>removeMe(bar.id,username)}>
                        I no more want to go there
                    </Btn>
                }
                <BarName name={bar.name} />
                <BarPhotos photos={bar.photos} />
                <BarLocation location={bar.location} />
                <BarIsWorking is_closed={bar.is_closed} />
                <BarPhone display_phone={bar.display_phone} />
                <BarPrice price={bar.price} />
                <BarOpenHours hours={bar.hours[0]} />
                <BarRating rating={bar.rating} />
                <BarUsers users={bar.users} me={username} />
            </div>
        }
        </div>
    )
}

export default BarPage