import {FC} from 'react'
import cs from "./LoadingLocal.module.css";

const LoadingLocal:FC = () => {
  return (
    <div className={cs.LoadCircle}></div>
  )
}

export default LoadingLocal