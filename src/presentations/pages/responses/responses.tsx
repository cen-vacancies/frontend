import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import { useEffect, useState } from 'react'
import { interest } from '../../../domain/api/data'
import { components } from '../../../domain/api/types/api-types.ts'
import { message } from 'antd'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import s from './responses.module.css'
import ButtonColor from '../../components/button-color/button-color.tsx'
type Props = {
  type: 'recieved' | 'sended'
}
function Responses({ type }: Props) {
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
  return (
    <PageWithCards title={type === 'sended' ? 'Отклики' : 'Приглашения'}>
      {contextHolder}
      {interests && interests.length > 0
        ? interests.map((item) => (
            <PageWithCards.Card to={`/vacancy/${item.id}`} title={item.vacancy.title}>
              <div className={s.cardContent}>
                {item.vacancy.proposed_salary && (
                  <span>{item.vacancy.proposed_salary.toLocaleString('ru')} &#8381;</span>
                )}
                <span>{item.vacancy.organization.name}</span>
              </div>
              <div className={s.cardControls}>
                <ButtonColor color='fill' width={180} disabled>
                  Отозвать
                </ButtonColor>
                <ButtonColor width={180} disabled>
                  Написать
                </ButtonColor>
              </div>
            </PageWithCards.Card>
          ))
        : type === 'sended'
          ? `Откликов еще нет`
          : `Приглашений еще нет`}
    </PageWithCards>
  )
}

export default Responses
