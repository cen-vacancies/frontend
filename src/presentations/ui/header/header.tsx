import ImageLink from '../../components/image-link/image-link.tsx'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import logo from '../../../assets/logo.svg'
import messagesImage from '../../../assets/messages.png'
import profileImage from '../../../assets/profile.png'
import burgerImage from '../../../assets/burger.svg'

import S from './header.module.css'
import { useContext } from 'react'
import { UserContext } from '../../../context/user-context.tsx'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import cv from './assets/cv.svg'
import respo from './assets/respo.svg'
import work from './assets/work.svg'
import vacancyIcon from './assets/vacancy.svg'
import { ChatContext } from '../../../context/chat-context.tsx'

const applicantConfigCv: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to={'/cv/create'}>Создать резюме</Link>,
  },
  {
    key: '2',
    label: <Link to={'/cv/list'}>Мои резюме</Link>,
  },
  {
    key: '3',
    label: <Link to={'/cv/archive'}>Архив</Link>,
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
    label: <Link to={'/vacancy/list'}>Мои вакансии</Link>,
  },
  {
    key: '3',
    label: <Link to={'/vacancy/archive'}>Архив</Link>,
    disabled: true,
  },
]

const employerConfigRespo: MenuProps['items'] = [
  {
    key: '1',
    label: <Link to={'/employer/responses/received'}>Отклики</Link>,
  },
  {
    key: '2',
    label: <Link to={'/employer/responses/send'}>Приглашенные</Link>,
  },
  {
    key: '3',
    label: <Link to={'/employer/responses/archive'}>Архив</Link>,
    disabled: true,
  },
]

const adminConfigNavLinks = [
  { to: '/admin/vacancies', text: 'ВАКАНСИИ' },
  { to: '/admin/cvs', text: 'РЕЗЮМЕ' },
  { to: '/admin/organizations', text: 'ОРГАНИЗАЦИИ' },
  { to: '/admin/users', text: 'ПОЛЬЗОВАТЕЛИ' },
]

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, organization, logoutUser } = useContext(UserContext)
  const { open: handleOpenChat } = useContext(ChatContext)

  const isRegisterBlock = pathname === '/' || pathname === '/register' || pathname === '/login'
  const isApplicant = user?.role === 'applicant'
  const isEmployer = user?.role === 'employer'
  const isAdmin = user?.role === 'admin'

  let logoLink = '/'
  if (isApplicant) {
    logoLink = '/applicant'
  }
  if (isEmployer) {
    logoLink = '/employer'
  }
  if (isAdmin) {
    logoLink = '/admin'
  }

  return (
    <div className={S.root}>
      <Link to={logoLink}>
        <img className={S.logo} src={logo} />
      </Link>
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
      {isAdmin && (
        <Space style={{ display: 'flex', gap: '20px', marginLeft: '40px' }}>
          {adminConfigNavLinks.map((link) => (
            <NavLink key={link.to} className={({ isActive }) => (isActive ? S.navLinkActive : S.navLink)} to={link.to}>
              {link.text}
            </NavLink>
          ))}
        </Space>
      )}
      <div className={S.buttons}>
        {!isRegisterBlock && (
          <>
            <ImageLink src={messagesImage} onClick={() => handleOpenChat()} />
            <ImageLink src={profileImage} to={`/user/edit`} />
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
        {user && <Button onClick={logoutUser}>Выйти</Button>}
      </div>
    </div>
  )
}

export default Header
