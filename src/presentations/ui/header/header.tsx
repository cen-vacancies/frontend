import ImageLink from '../../components/image-link/image-link.tsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import logo from '../../../assets/logo.svg'
import messagesImage from '../../../assets/messages.png'
import profileImage from '../../../assets/profile.png'
import burgerImage from '../../../assets/burger.svg'

import S from './header.module.css'
import { useContext } from 'react'
import { UserContext } from '../../../context/user-context.tsx'
import { Dropdown, MenuProps, Space } from 'antd'
import cv from './assets/cv.svg'
import respo from './assets/respo.svg'
import work from './assets/work.svg'
import vacancyIcon from './assets/vacancy.svg'

const applicantConfigCv: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to={'/cv/create'}>Создать резюме</Link>,
  },
  {
    key: '2',
    label: <Link to={'/cv/list'}>Мои резюме</Link>,
    disabled: true,
  },
  {
    key: '3',
    label: <Link to={'/cv/archive'}>Мои резюме</Link>,
    disabled: true,
  },
]

const applicantConfigRespo: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to={'/responses/send'}>Отклики</Link>,
  },
  {
    key: '2',
    label: <Link to={'/responses/received'}>Приглашения</Link>,
  },
  {
    key: '3',
    label: <Link to={'/responses/archive'}>Архив</Link>,
    disabled: true,
  },
]

const employerConfigVacancy: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to={'/vacancy/create'}>Разместить вакансию</Link>,
  },
  {
    key: '2',
    label: <Link to={'/responses/approved'}>Мои вакансии</Link>,
    disabled: true,
  },
  {
    key: '3',
    label: <Link to={'/responses/archive'}>Архив</Link>,
    disabled: true,
  },
]

const employerConfigRespo: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to={'/responses/active'}>Отклики</Link>,
    disabled: true,
  },
  {
    key: '2',
    label: <Link to={'/responses/approved'}>Приглашенные</Link>,
    disabled: true,
  },
  {
    key: '3',
    label: <Link to={'/responses/archive'}>Архив</Link>,
    disabled: true,
  },
]

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, organization } = useContext(UserContext)

  const isRegisterBlock = pathname === '/' || pathname === '/register' || pathname === '/login'
  const isApplicant = user?.role === 'applicant'
  const isEmployer = user?.role === 'employer'

  const logoHandler = () => {
    if (isRegisterBlock) {
      navigate('/')
    }
    if (isApplicant) {
      navigate('/applicant')
    }
    if (isEmployer) {
      navigate('/employer')
    }
  }

  return (
    <div className={S.root}>
      <img className={S.logo} src={logo} onClick={logoHandler} />
      {isEmployer && (
        <Space style={{ display: 'flex', gap: '20px', marginLeft: '40px' }}>
          <Link to={organization ? `/organization/${organization.id}` : '/organization/create'} className={S.navLink}>
            <Space>
              <img src={work} />
              Организация
            </Space>
          </Link>
          <Dropdown menu={{ items: employerConfigVacancy }}>
            <Space>
              <img src={vacancyIcon} />
              Вакансии
            </Space>
          </Dropdown>
          <Dropdown menu={{ items: employerConfigRespo }}>
            <Space>
              <img src={respo} />
              Отклики
            </Space>
          </Dropdown>
        </Space>
      )}
      {isApplicant && (
        <Space style={{ display: 'flex', gap: '20px', marginLeft: '40px' }}>
          <Dropdown menu={{ items: applicantConfigCv }}>
            <Space>
              <img src={cv} />
              Резюме
            </Space>
          </Dropdown>
          <Dropdown menu={{ items: applicantConfigRespo }}>
            <Space>
              <img src={respo} />
              Отклики
            </Space>
          </Dropdown>
        </Space>
      )}
      <div className={S.buttons}>
        {!isRegisterBlock && (
          <>
            <ImageLink src={messagesImage} to={'#'} />
            <ImageLink src={profileImage} to={'#'} />
            <button className={S.burgerButton}>
              <img src={burgerImage} />
            </button>
          </>
        )}
        {isRegisterBlock && (
          <>
            <button className={S.register} onClick={() => navigate('/register')}>
              Регистрация
            </button>
            <button className={S.login} onClick={() => navigate('/login')}>
              Вход
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
