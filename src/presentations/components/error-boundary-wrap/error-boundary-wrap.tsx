import { Alert } from 'antd'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

function ErrorBoundaryWrap({ children }: Props) {
  const { ErrorBoundary } = Alert

  return (
    <ErrorBoundary
      message={'Произошла непредвиденная ошибка'}
      description={'Попробуйте перезагрузить страницу или обратитесь за помощью'}
    >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryWrap
