import {FC, ReactNode} from 'react'
import cs from "./Btn.module.css"

interface BtnProps {
    children: ReactNode;
    onClick?: () => void;
    additionalClasses?: string;
}

const Btn:FC<BtnProps> = ({children, onClick, additionalClasses}) => {
    const classes = [cs.Btn];
    if(additionalClasses)
        classes.push(additionalClasses);
  return (
    <button onClick={onClick} className={classes.join(" ")}>{children}</button>
  )
}

export default Btn