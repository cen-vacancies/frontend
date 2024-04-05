import ImageLink from '../../components/image-link/image-link.tsx'

import logo from '../../../assets/logo.svg'
import messagesImage from '../../../assets/messages.png'
import profileImage from '../../../assets/profile.png'
import burgerImage from '../../../assets/burger.svg'

import S from './header.module.css'

function Header() {
  return (
    <div className={S.root}>
      <img className={S.logo} src={logo} />
      <div className={S.buttons}>
        <ImageLink src={messagesImage} to={'#'} />
        <ImageLink src={profileImage} to={'#'} />
        <button className={S.burgerButton}>
          <img src={burgerImage} />
        </button>
      </div>
    </div>
  )
}

export default Header
