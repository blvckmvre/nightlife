import {FC} from 'react'
import cs from "./LoadingGlobal.module.css"

const LoadingGlobal:FC = () => {
  return (
    <div className={cs.LoadScreen}>
        <div className={cs.LoadCircle}></div>
    </div>
  )
}

export default LoadingGlobal