import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cvs, interest, vacancies } from '../../../domain/api/data'
import Page from '../../ui/page/page.tsx'
import CV from '../../ui/cv/cv.tsx'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'
import s from './cv.module.css'
import { IMAGE_URL } from '../../../constants/constants.ts'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/user-context.tsx'
import ButtonColor from '../../components/button-color/button-color.tsx'
import { Button, message, Modal, Radio } from 'antd'
import { components } from '../../../domain/api/types/api-types.ts'
import { ErrorHandler } from '../../helpers/error-handler.ts'

function CVPage() {
  const { id } = useParams()
  const { user } = useContext(UserContext)

  const { data } = useQuery(['cv', id], () => cvs.getCVById(id), {
    refetchOnWindowFocus: false,
  })

  const imageLink = data?.data.photo ? `${IMAGE_URL}${data.data.photo}` : undefined
  const shouldShowEmployerControls = user?.role === 'employer' && id

  return (
    <Page>
      <Page.Content>
        <div className={s.content}>
          <div className={s.hideOnDesktop}>
            <CV.Name title={data?.data.applicant.fullname}>
              {shouldShowEmployerControls && <EmployerControls cvId={id} />}
            </CV.Name>
          </div>
          <div className={s.main}>{data?.data && <CV data={data.data} />}</div>
          <div className={s.footer}>
            <ButtonWithIcon linkTo={'/employer'}>Назад к резюме</ButtonWithIcon>
          </div>
        </div>
      </Page.Content>
      <Page.Aside>
        <CV.Name src={imageLink} title={data?.data.applicant.fullname}>
          {shouldShowEmployerControls && <EmployerControls cvId={id} />}
        </CV.Name>
      </Page.Aside>
    </Page>
  )
}
type EmployerControlsProps = {
  cvId: string
}
const EmployerControls = ({ cvId }: EmployerControlsProps) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalVacancyOpen, setIsModalVacancyOpen] = useState(false)
  const [vacancyList, setVacancyList] = useState<components['schemas']['VacanciesQueryResponse']['data']>()
  const [selectedVacancy, setSelectedVacancy] = useState<number>()
  const sendInterestToVacancy = () => {
    if (selectedVacancy !== undefined) {
      interest
        .sendInterestToVacancy(selectedVacancy, Number(cvId))
        .then(() => {
          setIsModalVacancyOpen(false)
        })
        .catch((e) =>
          messageApi.open({
            type: 'error',
            content: ErrorHandler(e),
          }),
        )
    }
  }

  useEffect(() => {
    vacancies
      .getVacancies()
      .then((res) => setVacancyList(res.data))
      .catch((e) => {
        messageApi.open({
          type: 'error',
          content: ErrorHandler(e),
        })
      })
  }, [messageApi])
  return (
    <>
      {contextHolder}
      <Modal
        title='ВЫБЕРИТЕ ВАКАНСИЮ'
        open={isModalVacancyOpen}
        onCancel={() => setIsModalVacancyOpen(false)}
        footer={() => (
          <Button type='primary' onClick={sendInterestToVacancy}>
            Отправить
          </Button>
        )}
      >
        {vacancyList && vacancyList.length > 0 ? (
          <Radio.Group
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            options={vacancyList.map((item) => ({ value: item.id, label: item.title }))}
            onChange={({ target: { value } }) => setSelectedVacancy(value)}
            value={selectedVacancy}
          />
        ) : (
          'Вакансий еще нет'
        )}
      </Modal>
      <div className={s.buttonsApplicant}>
        <ButtonColor color='fill' width={160} onClick={() => setIsModalVacancyOpen(true)}>
          Пригласить
        </ButtonColor>
        <ButtonColor disabled width={160}>
          Написать
        </ButtonColor>
      </div>
    </>
  )
}

export default CVPage
