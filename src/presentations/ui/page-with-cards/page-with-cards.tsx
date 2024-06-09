import Page from '../page/page.tsx'
import s from './page-with-cards.module.css'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title?: string
}
function PageWithCards({ children, title }: Props) {
  return (
    <Page>
      <Page.Content>
        <span className={s.heading}>{title}</span>
        <div className={s.list}>{children}</div>
      </Page.Content>
      <Page.Aside />
    </Page>
  )
}

type CardProps = {
  title?: string
  children?: ReactNode
}

PageWithCards.Card = ({ title, children }: CardProps) => {
  return (
    <div className={s.card}>
      <span className={s.cardHeading}>{title}</span>
      {children}
    </div>
  )
}

export default PageWithCards
