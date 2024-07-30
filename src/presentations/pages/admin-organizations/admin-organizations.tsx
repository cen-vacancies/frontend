import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import { useEffect, useState } from 'react'
import { admin } from '../../../domain/api/data'
import { components } from '../../../domain/api/types/api-types.ts'
import { Button, Col, message, Row } from 'antd'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import s from './admin-organizations.module.css'
import Title from 'antd/lib/typography/Title'
import Paragraph from 'antd/es/typography/Paragraph'
import { Link } from 'react-router-dom'
function AdminOrganizations() {
  const [organizations, setOrganizations] = useState<components['schemas']['OrganizationsListResponse']['data']>([])
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    admin
      .getPrivateOrganizations()
      .then((items) => {
        setOrganizations(items.data)
      })
      .catch((e) => {
        console.error(e)
        messageApi.open({
          type: 'error',
          content: ErrorHandler(e),
        })
      })
  }, [messageApi])

  return (
    <PageWithCards title={'Организации'}>
      {contextHolder}
      <Row gutter={10} className={s.desktopHeader}>
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
        <Col span={6}>
          <Title style={{ margin: 0 }} level={4}>
            САЙТ
          </Title>
        </Col>
      </Row>
      {organizations && organizations.length > 0
        ? organizations.map((item) => {
            return (
              <PageWithCards.Card>
                <Row gutter={10}>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.name}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.email}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Paragraph>{item.website}</Paragraph>
                  </Col>
                  <Col xs={24} lg={6}>
                    <Link to={`/admin/organizations/${item.id}`}>
                      <Button shape='round'>Редактировать</Button>
                    </Link>
                  </Col>
                </Row>
              </PageWithCards.Card>
            )
          })
        : 'Организаций нет'}
    </PageWithCards>
  )
}

export default AdminOrganizations
