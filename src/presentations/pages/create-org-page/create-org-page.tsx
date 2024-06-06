import { Form, Input, Button, message, ConfigProvider, Typography, Upload } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import Page from '../../ui/page/page'
import { components } from '../../../domain/api/types/api-types.ts'
import { organisations, upload } from '../../../domain/api/data'
import s from './create-org-page.module.css'
import { useContext, useState } from 'react'
import { RcFile } from 'antd/es/upload'
import { UserContext } from '../../../context/user-context.tsx'

const { TextArea } = Input
const { Title } = Typography

function CreateVacancyPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState<string>()
  const [form] = Form.useForm<components['schemas']['CreateOrganizationRequest']['organization']>()
  const { fetchOrganization } = useContext(UserContext)
  const onSubmit = async (values: components['schemas']['CreateOrganizationRequest']['organization']) => {
    try {
      await organisations.createOrganization({ ...values, logo: imageUrl })
      fetchOrganization()
      navigate('/employer')
    } catch (e: unknown) {
      messageApi.open({
        type: 'error',
        content: ErrorHandler(e),
      })
    }
  }

  async function uploadRequest({ file }: { file: string | Blob | RcFile; filename?: string }) {
    try {
      const url = await upload(file as File)
      if (url) setImageUrl(url)
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: 'ошибка загрузки фото',
      })
    }
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
          Typography: {
            titleMarginBottom: 40,
          },
          Upload: {
            fontSize: 24,
            colorText: '#B5B5B5',
            colorBorder: '#A2C7E0',
          },
        },
      }}
    >
      <Page>
        <Page.Content align='left'>
          {contextHolder}
          <Form form={form} className={s.container} layout='vertical' onFinish={onSubmit}>
            <span className={s.heading}>Организация</span>
            <Title level={5}>Общая информация</Title>
            <Form.Item
              label='Название организации*'
              name='name'
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <TextArea autoSize />
            </Form.Item>
            <Form.Item>
              <Upload
                listType='picture-card'
                showUploadList={false}
                customRequest={uploadRequest}
                style={{ border: 'solid' }}
              >
                {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : <>Загрузить фото</>}
              </Upload>
            </Form.Item>

            <Form.Item name='description' label='Описание*' rules={[{ required: true, message: 'Обязательное поле' }]}>
              <TextArea style={{ minHeight: '110px' }} autoSize placeholder='Обязанности, дополнительная информация' />
            </Form.Item>

            <Title level={5}>Контакты</Title>
            <Form.Item name='phone' label='Номер телефона*' rules={[{ required: true, message: 'Обязательное поле' }]}>
              <Input />
            </Form.Item>
            <Form.Item name='email' label='Почта*' rules={[{ required: true, message: 'Обязательное поле' }]}>
              <Input />
            </Form.Item>

            <Title level={5}>Контакты</Title>
            <Form.Item
              name='website'
              label='Сайт организации*'
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name='social_link' label='Соцсеть*' rules={[{ required: true, message: 'Обязательное поле' }]}>
              <Input />
            </Form.Item>

            <Title level={5} style={{ marginBottom: '8px' }}>
              Адрес*
            </Title>
            <Form.Item name='address' rules={[{ required: true, message: 'Обязательное поле' }]}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </Page.Content>
      </Page>
    </ConfigProvider>
  )
}

export default CreateVacancyPage
