import UItext from './i18n.json'

import type { components } from '../../../domain/api/types/api-types.ts'

import S from './cv-card.module.css'
import { getWorkExp } from '../../helpers/get-work-exp.ts'

type VacancyCardProps = Pick<
  components['schemas']['CV'],
  'title' | 'applicant' | 'educations' | 'field_of_art' | 'years_of_work_experience'
>

function CvCard({ title, field_of_art, applicant, years_of_work_experience }: VacancyCardProps) {
  return (
    <div className={S.vacancyCard}>
      <p className={S.header}>{title}</p>
      <p className={S.description}>
        {`${applicant.fullname}, ${getYears(applicant.birth_date)}`}
        <br />
        {UItext.field_of_art[field_of_art]}
        <br />
        {getWorkExp(years_of_work_experience)}
      </p>
    </div>
  )
}

function getYears(birthDate: string | null) {
  if (!birthDate) return null
  const dateNow = new Date()
  const dateBirth = new Date(birthDate)

  const year = Math.ceil((dateNow.getTime() - dateBirth.getTime()) / (1000 * 60 * 60 * 24 * 365))

  if (year === undefined || year <= 0) {
    return null
  }

  let res = `${year} лет`
  if (year % 10 === 1) res = `${year} год`
  if (2 <= year % 10 && year % 10 <= 4) res = `${year} года`
  return res
}

export default CvCard
