import { Col, Form, Row, Input, ConfigProvider, Space, message } from 'antd'
import Page from '../../ui/page/page.tsx'
import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import Title from 'antd/lib/typography/Title'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'
import { components } from '../../../domain/api/types/api-types.ts'
import { useContext, useState } from 'react'
import Paragraph from 'antd/es/typography/Paragraph'
import { UserContext } from '../../../context/user-context.tsx'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import { user } from '../../../domain/api/data'
import s from './user-edit.module.css'

function UserEditPage() {
  const { user, updateUser } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState<'base' | 'private'>('base')
  const [messageApi, contextHolder] = message.useMessage()
  const errorHandle = (e: unknown) => {
    messageApi.open({
      type: 'error',
      content: ErrorHandler(e),
    })
  }
  if (!user) {
    return null
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
      {contextHolder}
      <Page>
        <Page.Content fullsize>
          <div style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'column' }}>
            <Row>
              <Col lg={6} className={s.tabDesktop}>
                <PageWithCards.Card title='Настройки'>
                  <Space style={{ marginTop: -10 }} direction='vertical' size={0}>
                    <Paragraph
                      className={s.tab}
                      onClick={() => setActiveTab('base')}
                      data-active={activeTab === 'base'}
                    >
                      Личные данные
                    </Paragraph>
                    <Paragraph
                      className={s.tab}
                      onClick={() => setActiveTab('private')}
                      data-active={activeTab === 'private'}
                    >
                      Данные для входа
                    </Paragraph>
                  </Space>
                </PageWithCards.Card>
              </Col>
              <Col xs={24} lg={{ span: 8, offset: 2 }}>
                <Title className={s.mobileTitle} style={{ marginTop: 0 }} level={2}>
                  Настройки
                </Title>
                <Space className={s.mobileTab} direction='horizontal' size={'small'}>
                  <Paragraph className={s.tab} onClick={() => setActiveTab('base')} data-active={activeTab === 'base'}>
                    Личные данные
                  </Paragraph>
                  <Paragraph
                    className={s.tab}
                    onClick={() => setActiveTab('private')}
                    data-active={activeTab === 'private'}
                  >
                    Данные для входа
                  </Paragraph>
                </Space>
                {user && (
                  <>
                    {activeTab === 'base' && (
                      <BaseInfoForm
                        onUpdateUser={updateUser}
                        onError={errorHandle}
                        fullname={user.fullname}
                        birth_date={user.birth_date}
                        phone={user.phone}
                      />
                    )}
                    {activeTab === 'private' && (
                      <PrivateInfoForm onUpdateUser={updateUser} onError={errorHandle} email={user.email} />
                    )}
                  </>
                )}
              </Col>
            </Row>
          </div>
        </Page.Content>
      </Page>
    </ConfigProvider>
  )
}
type OnError = (e: unknown) => void

type BaseInfoProps = Pick<components['schemas']['User'], 'fullname' | 'birth_date' | 'phone'> & {
  onError: OnError
  onUpdateUser: UserContext['updateUser']
}
function BaseInfoForm(props: BaseInfoProps) {
  const { fullname, birth_date, phone, onError, onUpdateUser } = props
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm<components['schemas']['UpdateUserInfoRequest']['user']>()
  const handleSubmit = async (value: components['schemas']['UpdateUserInfoRequest']['user']) => {
    setIsLoading(true)
    /*const dataReq = Object.keys(value).reduce((previousValue, currentValue) => {
      if(value[currentValue] !== props[currentValue]) {
        return previousValue = {...previousValue, [`${currentValue}`]:value[currentValue]}
      }
      return previousValue
    }, {})*/
    const dataReq = {
      fullname: value.fullname !== fullname ? value.fullname : undefined,
      birth_date: value.birth_date !== birth_date ? value.birth_date : undefined,
      phone: value.phone !== phone ? value.phone : undefined,
    }
    let userRes

    try {
      userRes = (await user.updateBaseUserInfo(dataReq)).data
    } catch (e) {
      onError(e)
    } finally {
      onUpdateUser(userRes)
      setIsLoading(false)
    }
  }
  return (
    <Form disabled={isLoading} form={form} layout='vertical' onFinish={handleSubmit}>
      <Form.Item name='fullname' label={'ФИО'} initialValue={fullname}>
        <Input type='text' placeholder='Иванов Иван Иванович' />
      </Form.Item>
      <Form.Item name='birth_date' label={'Дата рождения'} initialValue={birth_date}>
        <Input type='date' />
      </Form.Item>
      <Form.Item
        name='phone'
        label='Номер телефона'
        rules={[{ message: 'Номер должен быть в формате +79000000000', pattern: /(\+7)(\d{10})/, len: 12 }]}
        initialValue={phone}
      >
        <Input />
      </Form.Item>
      <ButtonWithIcon>Сохранить</ButtonWithIcon>
    </Form>
  )
}

type PrivateInfoFormValues = {
  email: string
  current_pass_email?: string
  new_pass?: string
  current_password?: string
}

function PrivateInfoForm({
  email,
  onError,
  onUpdateUser,
}: {
  email: string
  onError: OnError
  onUpdateUser: UserContext['updateUser']
}) {
  const [form] = Form.useForm<PrivateInfoFormValues>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (value: PrivateInfoFormValues) => {
    const { email: newEmail, current_pass_email, new_pass, current_password } = value

    setIsLoading(true)

    let userRes

    try {
      if (email !== newEmail && current_pass_email) {
        userRes = (await user.updateUserEmail({ email: newEmail, current_password: current_pass_email })).data
      }
    } catch (e) {
      onError(e)
    }

    try {
      if (new_pass && current_password) {
        userRes = (await user.updateUserPassword({ current_password, password: new_pass })).data
      }
    } catch (e) {
      onError(e)
    }
    onUpdateUser(userRes)
    setIsLoading(false)
  }
  return (
    <Form form={form} disabled={isLoading} layout='vertical' onFinish={handleSubmit}>
      <Title style={{ marginTop: 0 }} level={4}>
        Обновить почту
      </Title>
      <Form.Item
        label={'Почта'}
        name='email'
        initialValue={email}
        rules={[
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
        label={'Текущий пароль'}
        name='current_pass_email'
        dependencies={['email']}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!getFieldValue('email') || (value && getFieldValue('email')) || getFieldValue('email') === email) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Введите текущий пароль'))
            },
          }),
        ]}
      >
        <Input type='password' />
      </Form.Item>
      <Title level={4}>Обновить пароль</Title>
      <Form.Item
        label={'Текущий пароль'}
        name='current_password'
        dependencies={['new_pass']}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!getFieldValue('new_pass') || (value && getFieldValue('new_pass'))) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Введите текущий пароль'))
            },
          }),
        ]}
      >
        <Input type='password' />
      </Form.Item>
      <Form.Item
        label={'Новый пароль'}
        name='new_pass'
        rules={[{ min: 12, max: 72, message: 'Пароль должен содержать от 12 до 72 знаков' }]}
      >
        <Input type='password' />
      </Form.Item>
      <Form.Item
        label={'Подтвердите пароль'}
        name='retry-pass'
        dependencies={['new_pass']}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('new_pass') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Пароли не совпадают'))
            },
          }),
        ]}
      >
        <Input type='password' />
      </Form.Item>
      <ButtonWithIcon>Сохранить</ButtonWithIcon>
    </Form>
  )
}
export default UserEditPage
