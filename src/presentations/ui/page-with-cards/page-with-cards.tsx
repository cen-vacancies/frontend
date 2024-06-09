import Page from '../page/page.tsx'
import s from './page-with-cards.module.css'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children?: ReactNode
  title?: string
  asideContent?: ReactNode
}
function PageWithCards({ children, title, asideContent }: Props) {
  return (
    <Page>
      <Page.Content>
        <span className={s.heading}>{title}</span>
        <div className={s.list}>{children}</div>
      </Page.Content>
      <Page.Aside>{asideContent}</Page.Aside>
    </Page>
  )
}

type CardProps = {
  title?: string
  children?: ReactNode
  to: string
}

PageWithCards.Card = ({ title, children, to }: CardProps) => {
  return (
    <Link className={s.card} to={to}>
      <span className={s.cardHeading}>{title}</span>
      {children}
    </Link>
  )
}

export default PageWithCards
