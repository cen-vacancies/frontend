import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import React, { useContext, useEffect, useState } from 'react'
import { interest } from '../../../domain/api/data'
import { components } from '../../../domain/api/types/api-types.ts'
import { message } from 'antd'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import s from './responses.module.css'
import ButtonColor from '../../components/button-color/button-color.tsx'
import { UserContext } from '../../../context/user-context.tsx'
import { ChatContext } from '../../../context/chat-context.tsx'
type Props = {
  type: 'recieved' | 'sended'
}
function Responses({ type }: Props) {
  const { user } = useContext(UserContext)
  const { open: handleOpenChat } = useContext(ChatContext)
  const [interests, setInterests] = useState<components['schemas']['InterestsListResponse']['data']>([])
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    interest
      .getInterests(type)
      .then((items) => {
        setInterests(items.data)
      })
      .catch((e) => {
        console.error(e)
        messageApi.open({
          type: 'error',
          content: ErrorHandler(e),
        })
      })
  }, [messageApi, type])

  const handleSendMessage = (
    e: React.MouseEvent<HTMLButtonElement>,
    cv: components['schemas']['CV'],
    vacancy: components['schemas']['Vacancy'],
  ) => {
    e.stopPropagation()
    e.preventDefault()
    handleOpenChat(cv, vacancy)
  }

  const isEmployer = user?.role === 'employer'
  let title = type === 'sended' ? 'Отклики' : 'Приглашения'
  let emptyText = type === 'sended' ? `Откликов еще нет` : `Приглашений еще нет`

  if (isEmployer) {
    title = type === 'recieved' ? 'Отклики' : 'Приглашения'
    emptyText = type === 'recieved' ? 'Откликов еще нет' : 'Приглашений еще нет'
  }
  return (
    <PageWithCards title={title}>
      {contextHolder}
      {interests && interests.length > 0
        ? interests.map((item) => {
            const handleUnInterest = (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              e.stopPropagation()
              interest
                .unsendInterest(item.cv.id, item.vacancy.id)
                .then(() => {
                  setInterests((prev) => prev.filter((inter) => inter.id !== item.id))
                })
                .catch((e) => {
                  console.error(e)
                  messageApi.open({
                    type: 'error',
                    content: ErrorHandler(e),
                  })
                })
            }
            return (
              <PageWithCards.Card
                to={isEmployer ? `/cv/${item.cv.id}` : `/vacancy/${item.vacancy.id}`}
                title={isEmployer ? item.cv.title : item.vacancy.title}
                key={item.id}
              >
                <div className={s.cardContent}>
                  {item.vacancy.proposed_salary && (
                    <span>{item.vacancy.proposed_salary.toLocaleString('ru')} &#8381;</span>
                  )}
                  <span>{isEmployer ? item.cv.applicant.fullname : item.vacancy.organization.name}</span>
                </div>
                <div className={s.cardControls}>
                  <ButtonColor color='fill' width={180} onClick={handleUnInterest}>
                    Отозвать
                  </ButtonColor>
                  <ButtonColor width={180} onClick={(e) => handleSendMessage(e, item.cv, item.vacancy)}>
                    Написать
                  </ButtonColor>
                </div>
              </PageWithCards.Card>
            )
          })
        : emptyText}
    </PageWithCards>
  )
}

export default Responses
