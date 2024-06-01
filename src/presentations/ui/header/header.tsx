import ImageLink from '../../components/image-link/image-link.tsx'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from '../../../assets/logo.svg'
import messagesImage from '../../../assets/messages.png'
import profileImage from '../../../assets/profile.png'
import burgerImage from '../../../assets/burger.svg'

import S from './header.module.css'

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isRegisterBlock = pathname === '/' || pathname === '/register' || pathname === '/login'

  const logoHandler = () => {
    if (isRegisterBlock) {
      navigate('/')
    }
  }
  return (
    <div className={S.root}>
      <img className={S.logo} src={logo} onClick={logoHandler} />
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
