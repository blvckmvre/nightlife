import {FC} from 'react'
import BarList from '../comps/BarList';
import Btn from '../comps/ui/btn/Btn';
import LoadingGlobal from '../comps/ui/loading/global/LoadingGlobal';
import { useTypeDispatch, useTypeSelector } from '../hooks/redux-hooks'
import { logoutAction } from '../store/action-creators/auth';
import { barAPI } from '../store/reducers/barApi';
import { IBarFetchParams } from '../types/bars';

const coords: IBarFetchParams = {lat: 0, lon: 0};

const Main:FC = () => {
  const {isLoggedIn} = useTypeSelector(state=>state.auth);
  const {isFetching,error,data} = barAPI.useGetAllQuery(coords);
  const d = useTypeDispatch();

  // Yelp's API doesn't seem to return any results according to my geolocation,
  // so ultimately I ended up taking for granted that my coords are 0/0.
  // But if I had to use my current location, I would've done something like the following.


  // const [coords,setCoords] = useState<IBarFetchParams>({lat: 0, lon: 0});

  // useEffect(()=>{
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(pos=>{
  //       setCoords({lat: pos.coords.latitude, lon: pos.coords.longitude});
  //     });
  //   } else {
  //     console.log("geo not supported");
  //   }
  // },[])
  return (
    <div className='app-wrapper'>
      {isFetching && <LoadingGlobal />}
      {error && <p className='error-info'>{JSON.stringify(error)}</p>}
      {isLoggedIn && <Btn onClick={()=>d(logoutAction())}>LOG OUT</Btn>}
      <BarList bars={data ? data.businesses : []} />
    </div>
  )
}

export default Main