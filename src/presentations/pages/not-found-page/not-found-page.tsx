import Page from '../../ui/page/page.tsx'
import Title from 'antd/lib/typography/Title'

function NotFoundPage() {
  return (
    <Page>
      <Page.Content fullsize>
        <Title>Страница не существует</Title>
      </Page.Content>
    </Page>
  )
}

export default NotFoundPage
