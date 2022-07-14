import {FC} from 'react'

interface BarUsersProps {
    users: string[] | undefined;
    me: string;
}

const BarUsers:FC<BarUsersProps> = ({users, me}) => {
  return (
    <p>
        Going there:
        {
            users 
            ? 
            users.map(user=>
              <div key={user} className={user===me ? 'bar-user me' : 'bar-user'}>
                {user} {user===me && "(You)"}
              </div>
            )
            :
            " Nobody"
        }
    </p>
  )
}

export default BarUsers