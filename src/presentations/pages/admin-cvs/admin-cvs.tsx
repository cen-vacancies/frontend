import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import { useEffect, useState } from 'react'
import { admin, cvs } from '../../../domain/api/data'
import { components } from '../../../domain/api/types/api-types.ts'
import { Button, Col, message, Row, Space } from 'antd'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import s from './admin-cvs.module.css'
import Title from 'antd/lib/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import { Link } from 'react-router-dom'
function AdminCvs() {
  const [cvsData, setCvsData] = useState<components['schemas']['CVsListResponse']['data']>([])
  const [activeTab, setActiveTab] = useState<'unreviewed' | 'reviewed'>('reviewed')

  const [messageApi, contextHolder] = message.useMessage()

  const fetchFunction = activeTab === 'unreviewed' ? admin.getPrivateCvs : cvs.searchCvs

  useEffect(() => {
    fetchFunction()
      .then((items) => {
        setCvsData(items.data)
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
    <PageWithCards title={'Резюме'}>
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
            ФИО
          </Title>
        </Col>
        <Col span={6}>
          <Title style={{ margin: 0 }} level={4}>
            ПОЧТА
          </Title>
        </Col>
      </Row>
      {cvsData && cvsData.length > 0
        ? cvsData.map((item) => {
            return (
              <PageWithCards.Card>
                <Row gutter={10}>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.title}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.applicant.fullname}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.applicant.email}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Link to={`/cv/${item.id}`}>
                      <Button shape='round'>Редактировать</Button>
                    </Link>
                  </Col>
                </Row>
              </PageWithCards.Card>
            )
          })
        : 'Резюме нет'}
    </PageWithCards>
  )
}

export default AdminCvs
