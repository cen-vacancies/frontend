import { Link, useParams } from 'react-router-dom'
import s from './organization.module.css'
import Page from '../../ui/page/page.tsx'
import { useContext, useEffect, useState } from 'react'
import { components } from '../../../domain/api/types/api-types.ts'
import { organisations, vacancies } from '../../../domain/api/data'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import { message, Space } from 'antd'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'
import { IMAGE_URL } from '../../../constants/constants.ts'
import { UserContext } from '../../../context/user-context.tsx'

function OrganizationPage() {
  const { id } = useParams()
  const { organization } = useContext(UserContext)
  const [organizationData, setOrganizationData] = useState<components['schemas']['OrganizationResponse']['data']>()
  const [vacancyData, setVacancyData] = useState<components['schemas']['VacanciesQueryResponse']['data']>([])
  const [messageApi, contextHolder] = message.useMessage()

  const organizationImage = organizationData?.logo && `${IMAGE_URL}${organizationData.logo}`

  useEffect(() => {
    vacancies
      .getVacancies()
      .then((items) => {
        setVacancyData(items.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  useEffect(() => {
    if (!id) return
    organisations
      .getOrganizationById(id)
      .then((res) => setOrganizationData(res.data))
      .catch((e) => {
        console.error(e)
        messageApi.open({
          type: 'error',
          content: ErrorHandler(e),
        })
      })
  }, [id, messageApi])
  return (
    <Page>
      {contextHolder}
      <Page.Content>
        <div className={s.root}>
          <div className={s.topBlock}>
            <img src={organizationImage} className={s.image} />
            {organization?.id && organization.id.toString() === id && (
              <ButtonWithIcon linkTo={`/organization/${id}/edit`}>Редактировать</ButtonWithIcon>
            )}
          </div>
          <div className={s.organizationContent}>
            <h1 className={s.organizationHeading}>{organizationData?.name}</h1>
            <div className={s.card}>
              {organizationData?.description.split('\n').map((item) => (
                <>
                  {item}
                  <br />
                </>
              ))}
              <div>
                <h3 className={s.subtitle}>Контакты</h3>
                <span>{organizationData?.phone}</span>
              </div>
              <div>
                <h3 className={s.subtitle}>Адресс</h3>
                <span>{organizationData?.address}</span>
              </div>
            </div>
          </div>
          {vacancyData && vacancyData.length > 0 && (
            <div className={s.vacancy}>
              <h1 className={s.organizationHeading} style={{ marginBottom: '50px' }}>
                Вакансии
              </h1>
              <div className={s.vacancyList}>
                {vacancyData.map((item) => (
                  <Link to={`/vacancy/${item.id}`} className={s.vacancyCard}>
                    <span className={s.vacancyTitle}>{item.title}</span>
                    <div className={s.vacancyCardContent}>
                      {item.proposed_salary && <span>{item.proposed_salary.toLocaleString('ru')} &#8381;</span>}
                      <span>{item.organization.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Page.Content>
      <Page.Aside>
        <Space direction={'vertical'} size={50}>
          {organization?.id && organization.id.toString() === id && (
            <ButtonWithIcon linkTo={`/organization/${id}/edit`}>Редактировать</ButtonWithIcon>
          )}
          <img src={organizationImage} className={s.image} />
        </Space>
      </Page.Aside>
    </Page>
  )
}

export default OrganizationPage
