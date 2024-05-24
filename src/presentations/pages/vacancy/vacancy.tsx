import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { vacancies } from '../../../domain/api/data'
import Page from '../../ui/page/page.tsx'
import Vacancy from '../../ui/vacancy/vacancy.tsx'
import s from './vacancy.module.css'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'
import { IMAGE_URL } from '../../../constants/constants.ts'

function VacancyPage() {
  const { id } = useParams()

  const { data } = useQuery(['vacancy', id], () => vacancies.getVacancyById(id), {
    refetchOnWindowFocus: false,
  })

  const organizationImage = data?.data.organization.logo && `${IMAGE_URL}${data.data.organization.logo}`

  return (
    <Page>
      <Page.Content>
        <div className={s.content}>
          <div className={s.hideOnDesktop}>
            <Vacancy.Organization
              id={data?.data.organization.id}
              title={data?.data.organization.name}
              src={organizationImage}
            />
          </div>
          <div className={s.main}>{data?.data && <Vacancy data={data.data} />}</div>
          <div className={s.footer}>
            <ButtonWithIcon linkTo={'/'}>Назад к вакансиям</ButtonWithIcon>
          </div>
        </div>
      </Page.Content>
      <Page.Aside>
        <Vacancy.Organization
          id={data?.data.organization.id}
          title={data?.data.organization.name}
          src={organizationImage}
        />
      </Page.Aside>
    </Page>
  )
}

export default VacancyPage
