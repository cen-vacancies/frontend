import { components } from '../../../domain/api/types/api-types.ts'

import s from './vacancy.module.css'
import { Link } from 'react-router-dom'

type Props = {
  data: components['schemas']['Vacancy']
}

function Vacancy({ data }: Props) {
  return (
    <article className={s.vacancy}>
      <h2 className={s.title}>{data.title}</h2>
      <p className={s.paragraph}>{data.description}</p>
      {data.proposed_salary && (
        <>
          <h2 className={s.title}>Зарплата</h2>
          <p className={s.paragraph}>{data.proposed_salary.toLocaleString('ru')} &#8381;</p>
        </>
      )}
      <h2 className={s.title}>Тип занятости</h2>
      <p className={s.paragraph}>{getEmployement(data.employment_types)}</p>
      <h2 className={s.title}>График работы</h2>
      <p className={s.paragraph}>{getSchedule(data.work_schedules)}</p>
      <h2 className={s.title}>Образование</h2>
      <p className={s.paragraph}>{getEducation(data.educations)}</p>
      <h2 className={s.title}>Сфера искусства</h2>
      <p className={s.paragraph}>{textFieldArt[data.field_of_art]}</p>
      <h2 className={s.title}>Опыт работы</h2>
      <p className={s.paragraph}>{getExp(data.min_years_of_work_experience)}</p>
      <h2 className={s.title}>Контакты</h2>
      <p className={s.paragraph}>
        {data.organization.employer.phone}
        <br />
        {data.organization.employer.email}
      </p>
    </article>
  )
}

type OrgProps = {
  src?: string
  title?: string
  id?: number
}
Vacancy.Organization = ({ src, title, id }: OrgProps) => {
  return (
    <div className={s.organization}>
      <img className={s.image} src={src} />
      <Link to={id ? `/organization/${id}` : ''} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 className={s.orgName}>{title}</h1>
      </Link>
    </div>
  )
}

export function getExp(year: number) {
  if (11 <= year % 100 && year % 100 <= 14) {
    return `${year} лет`
  }
  if (year % 10 === 1) {
    return `${year} год`
  }
  if (2 <= year % 10 && year % 10 <= 4) {
    return `${year} года`
  }
  if (year <= 0) {
    return 'Без опыта'
  }
  return `${year} лет`
}

function getEmployement(items: components['schemas']['Vacancy']['employment_types']) {
  const text = {
    main: 'основная работа',
    secondary: 'совместительство',
    practice: 'практика',
    internship: 'стажировка',
  }

  return items.map((item) => text[item]).join(', ')
}

function getSchedule(items: components['schemas']['Vacancy']['work_schedules']) {
  const text = {
    full_time: 'полный день',
    part_time: 'неподный день',
    remote_working: 'удаленная работа',
    hybrid_working: 'гибридный формат',
    flexible_schedule: 'гибкий график',
  }

  return items.map((item) => text[item]).join(', ')
}

function getEducation(items: components['schemas']['Vacancy']['educations']) {
  const text = {
    none: 'не указано',
    secondary: 'среднее',
    secondary_vocational: 'среднее специальное',
    bachelor: 'бакалавр',
    master: 'магистратура',
    doctor: 'научная степень',
  }

  return items.map((item) => text[item]).join(', ')
}

const textFieldArt = {
  music: 'музыкальное искусство',
  visual: 'изобразительное искусство',
  performing: 'театральное искусство',
  choreography: 'хореография',
  folklore: 'фольклор',
  other: 'прочее',
}

export default Vacancy
