import {ChangeEvent, FC, InputHTMLAttributes} from 'react'
import cs from "./Input.module.css"

interface InputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    placeholder: string;
    required: boolean;
    maxLength: number;
    minLength: number;
}

const Input:FC<InputProps> = p => {
  return (
    <input className={cs.Input} {...p} />
  )
}

export default Input