import { InputHTMLAttributes } from 'react'
import S from './input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  height?: number
  width?: number
  label?: string
  nopadding?: boolean
}
function Input(props: InputProps) {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      {props.label && <label className={S.label}>{props.label}</label>}
      <input
        style={{ height: props.height ?? 50, width: props.width }}
        data-nopadding={props.nopadding}
        className={S.input}
        {...props}
      />
    </div>
  )
}

export default Input
