import { ButtonHTMLAttributes, ReactNode } from 'react'
import s from './button-color.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  width?: number
  color?: 'white' | 'fill'
}

function ButtonColor(props: Props) {
  return (
    <button
      className={s.button}
      data-fill={props.color === 'fill'}
      {...props}
      style={props.width ? { width: `${props.width}px` } : undefined}
    >
      {props.children}
    </button>
  )
}

export default ButtonColor
