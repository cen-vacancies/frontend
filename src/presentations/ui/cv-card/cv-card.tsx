import UItext from './i18n.json'
import { Link } from 'react-router-dom'

import type { components } from '../../../domain/api/types/api-types.ts'

import S from './cv-card.module.css'

type VacancyCardProps = Pick<components['schemas']['CV'], 'title' | 'applicant' | 'educations' | 'field_of_art' | 'id'>

function CvCard({ title, field_of_art, applicant, id }: VacancyCardProps) {
  return (
    <div className={S.vacancyCard}>
      <Link to={`/cv/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <p className={S.header}>{title}</p>
      </Link>
      <p className={S.description}>
        {`${applicant.fullname}, ${getYears(applicant.birth_date)}`}
        <br />
        {UItext.field_of_art[field_of_art]}
        <br />
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
