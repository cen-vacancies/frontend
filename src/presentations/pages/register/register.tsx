import Page from '../../ui/page/page.tsx'
import s from './register.module.css'
import { user } from '../../../domain/api/data'
import { Button, ConfigProvider, Form, message, Input, Space, Radio } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { components } from '../../../domain/api/types/api-types.ts'
import { useContext, useState } from 'react'
import { UserContext } from '../../../context/user-context.tsx'

function RegisterPage() {
  const { refetchAll } = useContext(UserContext)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const [form] = Form.useForm<components['schemas']['CreateUserRequest']['user']>()
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = async (values: components['schemas']['CreateUserRequest']['user']) => {
    const dataRequest = { ...values, confirm_password: undefined }
    const { email, password } = dataRequest
    setIsLoading(true)
    try {
      await user.register(dataRequest)
      await user.login(email, password)
      await refetchAll()
      navigate('/')
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: 'Авторизация не удалась, попробуйте снова',
      })
    }
    setIsLoading(false)
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 44,
          fontSize: 16,
        },
        components: {
          Checkbox: {
            borderRadiusSM: 5,
            sizeSM: 5,
          },
          Form: {
            labelRequiredMarkColor: 'transparent',
            labelFontSize: 16,
            itemMarginBottom: 35,
          },
        },
      }}
    >
      <Page>
        <Page.Content align='left'>
          {contextHolder}
          <Form disabled={isLoading} className={s.container} form={form} onFinish={submitHandler} layout='vertical'>
            <span className={s.heading}>Регистрация</span>
            <Form.Item label='Роль*'>
              <Form.Item
                initialValue='applicant'
                name='role'
                noStyle
                rules={[{ required: true, message: 'Обязательное поле' }]}
              >
                <Radio.Group>
                  <Space direction='vertical'>
                    <Radio value='applicant'>Соискатель</Radio>
                    <Radio value='employer'>Работодатель</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Form.Item>
            <Form.Item name='fullname' label={'ФИО*'} rules={[{ required: true, message: 'Обязательное поле' }]}>
              <Input type='text' placeholder='Иванов Иван Иванович' />
            </Form.Item>
            <Form.Item
              name='birth_date'
              label={'Дата рождения*'}
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <Input type='date' />
            </Form.Item>
            <Form.Item
              name='email'
              label={'Почта'}
              rules={[
                { required: true, message: 'Обязательное поле' },
                {
                  max: 160,
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{1,6}$/,
                  message: 'Почта не должна превышать 60 символов и должна быть уникальной',
                },
              ]}
            >
              <Input placeholder='post@mail.ru' />
            </Form.Item>
            <Form.Item
              name='phone'
              label='Номер телефона*'
              rules={[
                { required: true, message: 'Обязательное поле' },
                { message: 'Номер должен быть в формате +79000000000', pattern: /(\+7)(\d{10})/, len: 12 },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'password'}
              label='Пароль'
              rules={[
                { required: true, message: 'Обязательное поле' },
                { min: 12, max: 72, message: 'Пароль должен содержать от 12 до 72 знаков' },
              ]}
            >
              <Input type='password' />
            </Form.Item>
            <Form.Item
              name='confirm_password'
              label='Подтверждение пароля'
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Подтвердите пароль',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Пароли не совпадают'))
                  },
                }),
              ]}
            >
              <Input type='password' />
            </Form.Item>
            <div className={s.helpMessage}>
              <span>Уже есть аккаунт?</span>
              <Link className={s.link} to={'/login'}>
                Войти
              </Link>
            </div>
            <Form.Item>
              <Button loading={isLoading} type='primary' htmlType='submit'>
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </Page.Content>
      </Page>
    </ConfigProvider>
  )
}

export default RegisterPage
