import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cvs } from '../../../domain/api/data'
import Page from '../../ui/page/page.tsx'
import CV from '../../ui/cv/cv.tsx'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'
import s from './cv.module.css'
import { IMAGE_URL } from '../../../constants/constants.ts'

function CVPage() {
  const { id } = useParams()

  const { data } = useQuery(['cv', id], () => cvs.getCVById(id), {
    refetchOnWindowFocus: false,
  })

  const imageLink = data?.data.photo ? `${IMAGE_URL}${data.data.photo}` : undefined

  return (
    <Page>
      <Page.Content>
        <div className={s.content}>
          <div className={s.hideOnDesktop}>
            <CV.Name title={data?.data.applicant.fullname} />
          </div>
          <div className={s.main}>{data?.data && <CV data={data.data} />}</div>
          <div className={s.footer}>
            <ButtonWithIcon linkTo={'/employer'}>Назад к резюме</ButtonWithIcon>
          </div>
        </div>
      </Page.Content>
      <Page.Aside>
        <CV.Name src={imageLink} title={data?.data.applicant.fullname} />
      </Page.Aside>
    </Page>
  )
}

export default CVPage
