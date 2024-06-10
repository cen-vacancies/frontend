import { Form, Input, Button, Select, Checkbox, Space, message, ConfigProvider, Typography, InputNumber } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import Page from '../../ui/page/page'
import { components } from '../../../domain/api/types/api-types.ts'
import { vacancies } from '../../../domain/api/data'
import s from './create-vacancy-page.module.css'
import { useEffect } from 'react'

const { TextArea } = Input
const { Option } = Select
const { Title } = Typography

type Props = {
  isEdit?: boolean
}
function CreateVacancyPage({ isEdit }: Props) {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<components['schemas']['CreateVacancyRequest']['vacancy']>()
  useEffect(() => {
    if (!isEdit) return
    vacancies
      .getVacancyById(id)
      .then((data) => {
        if (data?.data) {
          form.setFieldsValue(data?.data)
        }
      })
      .catch(ErrorHandler)
  }, [form, id, isEdit])

  const onSubmit = async (values: components['schemas']['CreateVacancyRequest']['vacancy']) => {
    try {
      const data = isEdit ? id && (await vacancies.updateVacancy(id, values)) : await vacancies.createVacancy(values)
      if (!data) return
      navigate(`/vacancy/${data.data.id}`)
    } catch (e: unknown) {
      messageApi.open({
        type: 'error',
        content: ErrorHandler(e),
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
        },
      }}
    >
      <Page>
        <Page.Content align='left'>
          {contextHolder}
          <Form form={form} className={s.container} layout='vertical' onFinish={onSubmit}>
            <span className={s.heading}>Вакансия</span>
            <Title level={5}>Кого вы ищете?*</Title>
            <Form.Item name='title' rules={[{ required: true, message: 'Обязательное поле' }]}>
              <Input placeholder='Должность' />
            </Form.Item>

            <Form.Item
              name='field_of_art'
              label='Сфера искусства*'
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <Select>
                <Option value='music'>Музыкальное искусство</Option>
                <Option value='visual'>Изобразительное искусство</Option>
                <Option value='performing'>Театральное искусство</Option>
                <Option value='folklore'>Фольклор</Option>
                <Option value='choreography'>Хореография</Option>
                <Option value='other'>Прочее</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name='description'
              label='Описание вакансии*'
              rules={[{ required: true, message: 'Обязательное поле' }]}
            >
              <TextArea style={{ minHeight: '110px' }} autoSize placeholder='Обязанности, дополнительная информация' />
            </Form.Item>

            <Form.Item label='Тип занятости*'>
              <Form.Item name='employment_types' noStyle rules={[{ required: true, message: 'Обязательное поле' }]}>
                <Checkbox.Group>
                  <Space direction='vertical'>
                    <Checkbox value='main'>Основная работа</Checkbox>
                    <Checkbox value='secondary'>Совместительство</Checkbox>
                    <Checkbox value='practice'>Практика</Checkbox>
                    <Checkbox value='internship'>Стажировка</Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </Form.Item>

            <Form.Item label='График работы*'>
              <Form.Item name='work_schedules' noStyle rules={[{ required: true, message: 'Обязательное поле' }]}>
                <Checkbox.Group>
                  <Space direction='vertical'>
                    <Checkbox value='full_time'>Полный день</Checkbox>
                    <Checkbox value='part_time'>Неполный день</Checkbox>
                    <Checkbox value='remote_working'>Удаленная работа</Checkbox>
                    <Checkbox value='hybrid_working'>Гибридный формат</Checkbox>
                    <Checkbox value='flexible_schedule'>Гибкий график</Checkbox>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
            </Form.Item>

            <Form.Item name='education' label='Образование*' rules={[{ required: true, message: 'Обязательное поле' }]}>
              <Select>
                <Option value='none'>Не важно</Option>
                <Option value='secondary'>Среднее</Option>
                <Option value='secondary_vocational'>Среднее специальное</Option>
                <Option value='bachelor'>Бакалавр</Option>
                <Option value='master'>Магистратура</Option>
                <Option value='doctor'>Научная степень</Option>
              </Select>
            </Form.Item>
            <Form.Item label='Опыт работы'>
              <div className={s.experienceRow}>
                От
                <Form.Item name='min_years_of_work_experience' noStyle>
                  <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
                лет
              </div>
            </Form.Item>
            <Form.Item label='Зарплата'>
              <div className={s.sallaryRow}>
                От
                <Form.Item name='proposed_salary' className={s.sallaryRow} noStyle>
                  <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
                ₽
              </div>
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
