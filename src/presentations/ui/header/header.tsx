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

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const isRegisterBlock = pathname === '/' || pathname === '/register' || pathname === '/login'
  const isApplicant = user?.role === 'applicant'

  const logoHandler = () => {
    if (isRegisterBlock) {
      navigate('/')
    }
    if (isApplicant) {
      navigate('/applicant')
    }
  }

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
      label: <Link to={'/responses/active'}>Отклики</Link>,
      disabled: true,
    },
    {
      key: '2',
      label: <Link to={'/responses/approved'}>Приглашения</Link>,
      disabled: true,
    },
    {
      key: '3',
      label: <Link to={'/responses/archive'}>Архив</Link>,
      disabled: true,
    },
  ]
  return (
    <div className={S.root}>
      <img className={S.logo} src={logo} onClick={logoHandler} />
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
