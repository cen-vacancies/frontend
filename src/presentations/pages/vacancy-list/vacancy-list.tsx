import { useEffect, useState } from 'react'
import { components } from '../../../domain/api/types/api-types.ts'
import { message } from 'antd'
import { vacancies } from '../../../domain/api/data'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'
import s from './vacancy-list.module.css'

function VacancyListPage() {
  const [vacancyData, setVacancyData] = useState<components['schemas']['VacanciesQueryResponse']['data']>([])
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    vacancies
      .getVacancies()
      .then((items) => {
        setVacancyData(items.data)
      })
      .catch((e) => {
        console.error(e)
        messageApi.open({
          type: 'error',
          content: ErrorHandler(e),
        })
      })
  }, [messageApi])
  return (
    <PageWithCards
      title='Мои вакансии'
      asideContent={<ButtonWithIcon linkTo={'/vacancy/create'}>Разместить вакансию</ButtonWithIcon>}
    >
      {contextHolder}
      {vacancyData && vacancyData.length > 0
        ? vacancyData.map((item) => (
            <PageWithCards.Card to={`/vacancy/${item.id}`} title={item.title}>
              <div className={s.cardContent}>
                {item.proposed_salary && <span>{item.proposed_salary.toLocaleString('ru')} &#8381;</span>}
                <span>{item.organization.name}</span>
              </div>
            </PageWithCards.Card>
          ))
        : `Вакансий еще нет`}
    </PageWithCards>
  )
}

export default VacancyListPage
