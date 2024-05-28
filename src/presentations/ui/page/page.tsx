import { ReactNode } from 'react'
import Header from '../header/header.tsx'

import S from './page.module.css'

function Page({ children }: { children?: ReactNode }) {
  return (
    <div className={S.page}>
      <div className={S.header}>
        <Header />
      </div>
      <div className={S.content}>{children}</div>
    </div>
  )
}

Page.Aside = ({ children, isVisible = false }: { children?: ReactNode; isVisible?: boolean }) => {
  return (
    <div className={S.filters} data-show={isVisible}>
      {children}
    </div>
  )
}

Page.Content = ({ children, align = 'center' }: { children?: ReactNode; align?: 'center' | 'left' }) => {
  return (
    <div className={S.mainContent} data-align={align}>
      {children}
    </div>
  )
}

export default Page
