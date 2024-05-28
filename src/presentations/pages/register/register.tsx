import Page from '../../ui/page/page.tsx'
import Input from '../../components/input/input.tsx'
import s from './register.module.css'
import { FormEvent, useState } from 'react'
import { user } from '../../../domain/api/data'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Select from '../../components/select/select.tsx'

function RegisterPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const [role, setRole] = useState<string[]>(['applicant'])

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement
    e.preventDefault()
    if (!form.checkValidity()) {
      return
    }

    const dataReq = {
      birth_date: form.birth_date.value,
      email: form.email.value,
      fullname: form.fullname.value,
      password: form.password.value,
      phone: form.phone.value,
      role: role[0] as 'applicant' | 'employer',
    }
    try {
      await user.register(dataReq)
      await user.login(dataReq.email, dataReq.password)
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
          <span className={s.heading}>Регистрация</span>
          <div>
            <label className={s.label}>Роль*</label>
            <Select
              options={[
                { value: 'applicant', title: 'Соискатель' },
                { value: 'employer', title: 'Работодатель' },
              ]}
              selectedOptions={role}
              onSelect={(item) => setRole(item)}
              name={'role'}
            />
          </div>
          <Input required type='text' id='fullname' label={'ФИО*'} height={44} placeholder='Иванов Иван Иванович' />
          <Input required type='date' id='birth_date' nopadding label={'Дата рождения*'} height={44} />
          <Input required type='email' id='email' label={'Почта'} height={44} placeholder='post@mail.ru' />
          <Input
            required
            type='phone'
            id='phone'
            label={'Номер телефона'}
            height={44}
            placeholder='+79000000000'
            pattern='\+7\d{3}\d{3}\d{2}\d{2}'
          />
          <Input required type='password' id='password' label={'Пароль'} minLength={12} height={44} />
          <div className={s.helpMessage}>
            <span>Уже есть аккаунт?</span>
            <Link className={s.link} to={'/login'}>
              Войти
            </Link>
          </div>
          <button type='submit' className={s.searchButton}>
            Зарегистрироваться
          </button>
        </form>
      </Page.Content>
    </Page>
  )
}

export default RegisterPage
