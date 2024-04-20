import { InputHTMLAttributes } from 'react'
import S from './input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  height?: number
  width?: number
}
function Input(props: InputProps) {
  return <input style={{ height: props.height ?? 50, width: props.width }} className={S.input} {...props} />
}

export default Input
