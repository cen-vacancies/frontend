import { ReactNode } from 'react'
import arrow from './assets/arrow.svg'
import s from './button-with-icon.module.css'
import { Link } from 'react-router-dom'

type Props = {
  children?: ReactNode
  linkTo?: string
  isLight?: boolean
}
function ButtonWithIcon({ children, linkTo, isLight }: Props) {
  const Tag = linkTo ? Link : 'button'
  return (
    <Tag className={s.button} data-light={isLight} to={linkTo as string}>
      {!isLight && <img className={s.icon} src={arrow} />}
      {children}
    </Tag>
  )
}

export default ButtonWithIcon
