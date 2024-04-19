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

Page.Filters = ({ children }: { children?: ReactNode }) => {
  return <div className={S.filters}>{children}</div>
}

Page.Content = ({ children }: { children?: ReactNode }) => {
  return <div className={S.mainContent}>{children}</div>
}

export default Page
