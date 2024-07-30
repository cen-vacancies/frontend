import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import { useEffect, useState } from 'react'
import { admin, vacancies as vacanciesApi } from '../../../domain/api/data'
import { components } from '../../../domain/api/types/api-types.ts'
import { Button, Col, message, Row, Space } from 'antd'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import s from './admin-vacancies.module.css'
import Title from 'antd/lib/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import { Link } from 'react-router-dom'
function AdminVacancies() {
  const [vacancies, setVacancies] = useState<components['schemas']['VacanciesListResponse']['data']>([])
  const [activeTab, setActiveTab] = useState<'unreviewed' | 'reviewed'>('reviewed')

  const [messageApi, contextHolder] = message.useMessage()

  const fetchFunction = activeTab === 'unreviewed' ? admin.getPrivateVacancies : vacanciesApi.searchVacancy

  useEffect(() => {
    fetchFunction()
      .then((items) => {
        setVacancies(items.data)
      })
      .catch((e) => {
        console.error(e)
        messageApi.open({
          type: 'error',
          content: ErrorHandler(e),
        })
      })
  }, [messageApi, fetchFunction])

  return (
    <PageWithCards title={'Вакансии'}>
      {contextHolder}
      <Space style={{ marginTop: -70 }} direction='horizontal' size={'small'}>
        <Paragraph
          className={s.tab}
          onClick={() => setActiveTab('unreviewed')}
          data-active={activeTab === 'unreviewed'}
        >
          Неопубликованные
        </Paragraph>
        <Paragraph className={s.tab} onClick={() => setActiveTab('reviewed')} data-active={activeTab === 'reviewed'}>
          Опубликованные
        </Paragraph>
      </Space>
      <Row gutter={10} className={s.desktopHeader}>
        <Col span={6}>
          <Title style={{ margin: 0 }} level={4}>
            ПРОФЕССИЯ
          </Title>
        </Col>
        <Col span={6}>
          <Title style={{ margin: 0 }} level={4}>
            ЗАРПЛАТА
          </Title>
        </Col>
        <Col span={6}>
          <Title style={{ margin: 0 }} level={4}>
            ОРГАНИЗАЦИЯ
          </Title>
        </Col>
      </Row>
      {vacancies && vacancies.length > 0
        ? vacancies.map((item) => {
            return (
              <PageWithCards.Card>
                <Row gutter={10}>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.title}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.proposed_salary}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.organization.name}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Link to={`/vacancy/${item.id}/edit`}>
                      <Button shape='round'>Редактировать</Button>
                    </Link>
                  </Col>
                </Row>
              </PageWithCards.Card>
            )
          })
        : 'Вакансий нет'}
    </PageWithCards>
  )
}

export default AdminVacancies
