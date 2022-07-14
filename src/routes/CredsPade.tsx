import {FC, FormEvent} from 'react'
import { Link } from 'react-router-dom';
import Btn from '../comps/ui/btn/Btn';
import Input from '../comps/ui/input/Input';
import { useTypeDispatch, useTypeSelector } from '../hooks/redux-hooks';
import { mutationAction } from '../store/action-creators/auth';
import { authSlice } from '../store/reducers/authSlice';
import { AuthMutation, AuthOperations } from '../types/auth';

interface CredsPadeProps {
    type: AuthMutation;
}

const CredsPade:FC<CredsPadeProps> = ({type}) => {
    const {usernameInput,passwordInput} = useTypeSelector(state=>state.auth);
    const {setUsername,setPassword} = authSlice.actions;
    const d = useTypeDispatch();

    const sendCreds = (e: FormEvent) => {
        e.preventDefault();
        d(mutationAction({username: usernameInput, password: passwordInput, type}));
    }
  return (

    <div className='app-wrapper'>
        <form onSubmit={sendCreds} className="auth-form">
            <Input 
                value={usernameInput} 
                onChange={e=>d(setUsername(e.target.value))} 
                type="text" 
                placeholder='Login'
                required
                minLength={3}
                maxLength={16}
            />
            <Input 
                value={passwordInput} 
                onChange={e=>d(setPassword(e.target.value))} 
                type="password" 
                placeholder='Password'
                required
                minLength={3}
                maxLength={16}
            />
            <Btn additionalClasses='capitalized'>{type}</Btn>
        </form>
        {
            type===AuthOperations.login &&
            <h3 className='signup-link'>
                Don't have an account? <Link to="/signup">Sign Up!</Link>
            </h3>
        }
    </div>
  )
}

export default CredsPade