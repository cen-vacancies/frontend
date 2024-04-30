import UItext from './i18n.json'

import type { components } from '../../../domain/api/types/api-types.ts'

import S from './vacancy-card.module.css'
import { Link } from 'react-router-dom'

type VacancyCardProps = Pick<
  components['schemas']['Vacancy'],
  'title' | 'organization' | 'field_of_art' | 'proposed_salary' | 'min_years_of_work_experience' | 'id'
>
function VacancyCard({
  title,
  organization,
  field_of_art,
  proposed_salary,
  min_years_of_work_experience,
  id,
}: VacancyCardProps) {
  return (
    <div className={S.vacancyCard}>
      <Link to={`/vacancy/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <p className={S.header}>{title}</p>
      </Link>
      <div className={S.additional}>
        {proposed_salary && <span className={S.salary}>{proposed_salary.toLocaleString('ru')} &#8381;</span>}
        <div className={S.exp}>{getExp(min_years_of_work_experience)}</div>
      </div>
      <p className={S.description}>
        {organization.name}
        <br />
        {UItext.field_of_art[field_of_art]}
      </p>
    </div>
  )
}

function getExp(year: number) {
  if (year <= 0) {
    return 'Без опыта'
  }
  return `Опыт работы от ${year} ${year % 10 === 1 ? 'года' : 'лет'}`
}

export default VacancyCard
