import { InputHTMLAttributes } from 'react'
import S from './input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  height?: number
  width?: number
  label?: string
}
function Input(props: InputProps) {
  return (
    <div>
      {props.label && <label className={S.label}>{props.label}</label>}
      <input style={{ height: props.height ?? 50, width: props.width }} className={S.input} {...props} />
    </div>
  )
}

export default Input
