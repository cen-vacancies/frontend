import { ReactNode } from 'react'
import { Form, Input, Button, Select, Checkbox, Space, message, ConfigProvider, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import Page from '../../ui/page/page'
import { components } from '../../../domain/api/types/api-types.ts'
import { cvs } from '../../../domain/api/data'
import plusIcon from './assets/plus-circle-fill.svg'
import minusIcon from './assets/minus-circle-fill.svg'
import s from '../login/login.module.css'

const { TextArea } = Input
const { Option } = Select
const { Title } = Typography

const AddFieldButton = ({
  children,
  onClick,
  isMinus = false,
}: {
  onClick?: VoidFunction
  children?: ReactNode
  isMinus?: boolean
}) => {
  return (
    <button onClick={onClick} type={'button'} className={s.addFieldButton}>
      <img src={isMinus ? minusIcon : plusIcon} className={s.buttonIcon} />
      {children}
    </button>
  )
}

function CreateCVPage() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const [form] = Form.useForm<components['schemas']['CreateCVRequest']['cv']>()

  const onSubmit = async (values: components['schemas']['CreateCVRequest']['cv']) => {
    try {
      await cvs.createCv(values)
      navigate('/')
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: 'Сохранение не удалось, попробуйте снова',
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
            <span className={s.heading}>Создание резюме</span>
            <Title level={5}>Какую работу ищете?*</Title>
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

            <Form.Item name='summary' label='О себе*' rules={[{ required: true, message: 'Обязательное поле' }]}>
              <TextArea
                style={{ minHeight: '110px' }}
                autoSize
                placeholder='Навыки, предпочтения, дополнительная информация (готовность к переезду, медицинская книжка и т.п.)'
              />
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
            <Title level={5}>Образование</Title>

            <Form.List name='educations'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} direction='vertical'>
                      <AddFieldButton isMinus onClick={() => remove(name)}>
                        Удалить место учебы
                      </AddFieldButton>
                      <Form.Item
                        {...restField}
                        name={[name, 'level']}
                        label='Уровень образования*'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                      >
                        <Select>
                          <Option value='secondary'>Среднее</Option>
                          <Option value='secondary_vocational'>Среднее специальное</Option>
                          <Option value='bachelor'>Бакалавр</Option>
                          <Option value='master'>Магистратура</Option>
                          <Option value='doctor'>Научная степень</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'educational_institution']}
                        label='Название учебного заведения*'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item {...restField} name={[name, 'department']} label='Факультет'>
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'specialization']}
                        label='Специализация*'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'year_of_graduation']}
                        label='Год окончания*'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                      >
                        <Input type='number' />
                      </Form.Item>
                    </Space>
                  ))}
                  <Form.Item>
                    <AddFieldButton onClick={() => add()}>Добавить место учебы</AddFieldButton>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Title level={5}>Опыт работы</Title>
            <Form.List name='jobs'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} direction='vertical'>
                      <AddFieldButton isMinus onClick={() => remove(name)}>
                        Удалить место работы
                      </AddFieldButton>
                      <Form.Item
                        {...restField}
                        name={[name, 'organization_name']}
                        label='Организация'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'job_title']}
                        label='Должность'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'description']} label='Обязанности, достижения'>
                        <TextArea rows={2} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'start_date']}
                        label='Начало работы*'
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                      >
                        <Input type='date' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'end_date']}
                        rules={[{ required: true, message: 'Обязательное поле' }]}
                        label='Окончание*'
                      >
                        <Input type='date' />
                      </Form.Item>
                    </Space>
                  ))}
                  <Form.Item>
                    <AddFieldButton onClick={() => add()}>Добавить место работы</AddFieldButton>
                  </Form.Item>
                </>
              )}
            </Form.List>
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

export default CreateCVPage
