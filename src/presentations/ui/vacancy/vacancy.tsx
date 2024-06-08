import { components } from '../../../domain/api/types/api-types.ts'

import s from './vacancy.module.css'
import { Link } from 'react-router-dom'
import ButtonColor from '../../components/button-color/button-color.tsx'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/user-context.tsx'
import { Button, Modal, Radio } from 'antd'
import { cvs, interest } from '../../../domain/api/data'

type Props = {
  data: components['schemas']['Vacancy']
}

function Vacancy({ data }: Props) {
  return (
    <article className={s.vacancy}>
      <h2 className={s.title}>{data.title}</h2>
      <p className={s.paragraph}>
        {data.description.split('\n').map((item) => (
          <>
            {item}
            <br />
          </>
        ))}
      </p>
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
      <p className={s.paragraph}>{getEducation(data.education)}</p>
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalCvOpen, setIsModalCvOpen] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cvsList, setCvsList] = useState<components['schemas']['CVsQueryResponse']['data']>()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedCv, setSelectedCv] = useState<number>()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useContext(UserContext)
  const isApplicant = user?.role === 'applicant'

  const sendInterestToVacancy = () => {
    if (selectedCv !== undefined && id !== undefined) {
      interest
        .sendInterestToVacancy(selectedCv, id)
        .then(() => {
          setIsModalCvOpen(false)
        })
        .catch((e) => console.error(e))
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!isApplicant) {
      cvs
        .getCurrentCVS()
        .then((res) => setCvsList(res.data))
        .catch((e) => console.error(e))
    }
  }, [isApplicant])
  return (
    <div className={s.organization}>
      <Modal
        title='ВЫБЕРИТЕ РЕЗЮМЕ'
        open={isModalCvOpen}
        onCancel={() => setIsModalCvOpen(false)}
        footer={() => (
          <Button type='primary' onClick={sendInterestToVacancy}>
            Отправить
          </Button>
        )}
      >
        {cvsList && cvsList.length > 0 ? (
          <Radio.Group
            options={cvsList.map((item) => ({ value: item.id, label: item.title }))}
            onChange={({ target: { value } }) => setSelectedCv(value)}
            value={selectedCv}
          />
        ) : (
          'Резюме еще нет'
        )}
      </Modal>
      <div className={s.topBlock}>
        <img className={s.image} src={src} />
        {isApplicant && (
          <div className={s.buttonsApplicant}>
            <ButtonColor color='fill' width={160} onClick={() => setIsModalCvOpen(true)}>
              Откликнуться
            </ButtonColor>
            <ButtonColor disabled width={160}>
              Написать
            </ButtonColor>
          </div>
        )}
      </div>
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

function getEducation(item: components['schemas']['Vacancy']['education']) {
  const text = {
    none: 'не указано',
    secondary: 'среднее',
    secondary_vocational: 'среднее специальное',
    bachelor: 'бакалавр',
    master: 'магистратура',
    doctor: 'научная степень',
  }

  return text[item]
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
