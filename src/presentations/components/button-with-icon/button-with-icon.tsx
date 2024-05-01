import { ReactNode } from 'react'
import arrow from './assets/arrow.svg'
import s from './button-with-icon.module.css'
import { Link } from 'react-router-dom'

type Props = {
  children?: ReactNode
  linkTo?: string
}
function ButtonWithIcon({ children, linkTo }: Props) {
  const Tag = linkTo ? Link : 'button'
  return (
    <Tag className={s.button} to={linkTo as string}>
      <img className={s.icon} src={arrow} />
      {children}
    </Tag>
  )
}

export default ButtonWithIcon
