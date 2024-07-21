import { Col, Row, Space, Tabs } from 'antd'
import Page from '../../ui/page/page.tsx'
import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import Title from 'antd/lib/typography/Title'
import Input from '../../components/input/input.tsx'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'

function UserEditPage() {
  return (
    <Page>
      <Page.Content fullsize>
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
          <Row>
            <Col span={6}>
              <PageWithCards.Card title='Настройки'>
                <Tabs
                  tabPosition='left'
                  items={new Array(3).fill(null).map((_, i) => {
                    const id = String(i + 1)
                    return {
                      label: `Tab ${id}`,
                      key: id,
                      children: `Content of Tab ${id}`,
                    }
                  })}
                />
              </PageWithCards.Card>
            </Col>
            <Col span={8} offset={2}>
              <Space direction='vertical' size={35}>
                <Title level={2}>Обновить почту</Title>
                <Input type='email' id='email' label={'Почта'} height={44} />
                <Input type='password' id='current-pass-email' label={'Текущий пароль'} height={44} />
                <Title level={2}>Обновить пароль</Title>
                <Input type='email' id='current-pass' label={'Текущий пароль'} height={44} />
                <Input type='password' id='new-pass' label={'Новый пароль'} height={44} />
                <Input type='password' id='retry-pass' label={'Подтвердите пароль'} height={44} />
                <ButtonWithIcon>Сохранить</ButtonWithIcon>
              </Space>
            </Col>
          </Row>
        </div>
      </Page.Content>
    </Page>
  )
}

export default UserEditPage
