import Page from '../../ui/page/page.tsx'
import s from './main.module.css'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../../context/user-context.tsx'

function Card({ heading, list }: { heading: string; list: string[] }) {
  return (
    <div className={s.card}>
      <h3 className={s.cardHeading}>{heading}</h3>
      <ul className={s.cardList}>
        {list.map((item) => (
          <li className={s.cardListItem}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function MainPage() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const isAuth = !!user
  useEffect(() => {
    if (!isAuth) return
    if (user?.role === 'employer') {
      navigate('/employer')
    } else {
      navigate('/applicant')
    }
  }, [isAuth, navigate, user?.role])

  return (
    <Page>
      <Page.Content fullsize>
        <div className={s.container}>
          <div className={s.text}>
            <h1 className={s.heading}>творческий образовательный навигатор: </h1>
            <h1 className={s.subHeading}>Вакансии</h1>
          </div>
          <div className={s.cards}>
            <Card
              heading='Для соискателей'
              list={[
                'Удобный поиск работы и практики',
                'Актуальные вакансии',
                'Создание резюме',
                'Связь с работодателями',
              ]}
            />
            <Card
              heading='Для работодателей'
              list={[
                'Бесплатное размещение вакансий',
                'Удобный поиск соискателей и практикантов',
                'Связь с соискателями',
              ]}
            />
          </div>
        </div>
      </Page.Content>
    </Page>
  )
}

export default MainPage
