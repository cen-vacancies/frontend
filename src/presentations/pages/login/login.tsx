import Page from '../../ui/page/page.tsx'
import Input from '../../components/input/input.tsx'
import s from './login.module.css'
import { FormEvent, useContext } from 'react'
import { user } from '../../../domain/api/data'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/user-context.tsx'

function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { fetchUser } = useContext(UserContext)

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement
    e.preventDefault()
    if (!form.checkValidity()) {
      return
    }

    try {
      await user.login(form.email.value, form.password.value)
      fetchUser()
      navigate('/')
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: 'Авторизация не удалась, попробуйте снова',
      })
    }
  }
  return (
    <Page>
      <Page.Content align='left'>
        {contextHolder}
        <form className={s.container} onSubmit={submitHandler}>
          <span className={s.heading}>Вход</span>
          <Input required type='email' id='email' label={'Почта'} height={44} />
          <Input required type='password' id='password' label={'Пароль'} height={44} />
          <div className={s.helpMessage}>
            <span>Нет аккаунта?</span>
            <Link className={s.link} to={'/register'}>
              Зарегистрироваться
            </Link>
          </div>
          <button type='submit' className={s.searchButton}>
            Войти
          </button>
        </form>
      </Page.Content>
    </Page>
  )
}

export default LoginPage
