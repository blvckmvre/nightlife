import {FC, useEffect} from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import LoadingGlobal from './comps/ui/loading/global/LoadingGlobal'
import { useTypeDispatch, useTypeSelector } from './hooks/redux-hooks'
import BarPage from './routes/BarPage'
import CredsPade from './routes/CredsPade'
import Main from './routes/Main'
import { checkAuthAction } from './store/action-creators/auth'
import { AuthOperations } from './types/auth'

const App:FC = () => {

  const {isLoading,error,isLoggedIn,userData} = useTypeSelector(state=>state.auth);

  const d = useTypeDispatch();

  useEffect(()=>{
    if(localStorage.getItem("access"))
      d(checkAuthAction());
  },[])
  return (
    <>
    {isLoading 
    ?  
    <LoadingGlobal />
    :
    <BrowserRouter>
      <div id="navbar">
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
      {error && <p className='error-info'>{error}</p>}
      <h1 className='auth-info'>{userData ? 'Hello, '+userData.username : "You are not logged in"}</h1>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to='/' /> : <CredsPade type={AuthOperations.login} />} />
        <Route path='/signup' element={isLoggedIn ? <Navigate to='/' /> : <CredsPade type={AuthOperations.signup} />} />
        <Route path='/:bar_id' element={<BarPage />} />
        <Route path='/*' element={<Main />} />
      </Routes>
    </BrowserRouter>
    }
    </>
  )
}

export default App