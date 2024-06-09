import { useEffect, useState } from 'react'
import { components } from '../../../domain/api/types/api-types.ts'
import { message } from 'antd'
import { cvs } from '../../../domain/api/data'
import { ErrorHandler } from '../../helpers/error-handler.ts'
import PageWithCards from '../../ui/page-with-cards/page-with-cards.tsx'
import CvCard from '../../ui/cv-card/cv-card.tsx'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'

function CvListPage() {
  const [cvsData, setCvsData] = useState<components['schemas']['CVsQueryResponse']['data']>([])
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    cvs
      .getCurrentCVS()
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
  }, [messageApi])
  return (
    <PageWithCards
      title='Мои резюме'
      asideContent={<ButtonWithIcon linkTo={'/cv/create'}>Создать резюме</ButtonWithIcon>}
    >
      {contextHolder}
      {cvsData && cvsData.length > 0 ? cvsData.map((item) => <CvCard {...item} />) : `Резюме еще нет`}
    </PageWithCards>
  )
}

export default CvListPage
