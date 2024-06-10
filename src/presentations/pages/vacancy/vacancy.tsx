import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cvs, interest, vacancies } from '../../../domain/api/data'
import Page from '../../ui/page/page.tsx'
import Vacancy from '../../ui/vacancy/vacancy.tsx'
import s from './vacancy.module.css'
import ButtonWithIcon from '../../components/button-with-icon/button-with-icon.tsx'
import { IMAGE_URL } from '../../../constants/constants.ts'
import ButtonColor from '../../components/button-color/button-color.tsx'
import { useContext, useEffect, useState } from 'react'
import { components } from '../../../domain/api/types/api-types.ts'
import { UserContext } from '../../../context/user-context.tsx'
import { Button, message, Modal, Radio } from 'antd'
import { ErrorHandler } from '../../helpers/error-handler.ts'

function VacancyPage() {
  const { id } = useParams()

  const { user } = useContext(UserContext)
  const { data } = useQuery(['vacancy', id], () => vacancies.getVacancyById(id), {
    refetchOnWindowFocus: false,
  })

  const shouldShowApplicantControls = user?.role === 'applicant' && data?.data.organization.id !== undefined
  const organizationImage = data?.data.organization.logo && `${IMAGE_URL}${data.data.organization.logo}`

  return (
    <Page>
      <Page.Content>
        <div className={s.content}>
          <div className={s.hideOnDesktop}>
            <Vacancy.Organization
              id={data?.data.organization.id}
              title={data?.data.organization.name}
              src={organizationImage}
            />
          </div>
          <div className={s.main}>{data?.data && <Vacancy data={data.data} />}</div>
          <div className={s.footer}>
            <ButtonWithIcon linkTo={'/'}>Назад к вакансиям</ButtonWithIcon>
          </div>
        </div>
      </Page.Content>
      <Page.Aside>
        <Vacancy.Organization
          id={data?.data.organization.id}
          title={data?.data.organization.name}
          src={organizationImage}
        >
          {shouldShowApplicantControls && <ApplicantControls vacancyId={id as string} />}
        </Vacancy.Organization>
      </Page.Aside>
    </Page>
  )
}

type ApplicantControlsProps = {
  vacancyId: string
}
function ApplicantControls({ vacancyId }: ApplicantControlsProps) {
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalCvOpen, setIsModalCvOpen] = useState(false)
  const [cvsList, setCvsList] = useState<components['schemas']['CVsQueryResponse']['data']>()
  const [selectedCv, setSelectedCv] = useState<number>()
  const sendInterestToVacancy = () => {
    if (selectedCv !== undefined) {
      interest
        .sendInterestToVacancy(selectedCv, Number(vacancyId))
        .then(() => {
          setIsModalCvOpen(false)
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
    cvs
      .getCurrentCVS()
      .then((res) => setCvsList(res.data))
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
        title='ВЫБЕРИТЕ РЕЗЮМЕ'
        open={isModalCvOpen}
        onCancel={() => setIsModalCvOpen(false)}
        footer={() => (
          <Button type='primary' onClick={sendInterestToVacancy}>
            Отправить
          </Button>
        )}
      >
        {cvsList && cvsList.length > 0 ? (
          <Radio.Group
            options={cvsList.map((item) => ({ value: item.id, label: item.title }))}
            onChange={({ target: { value } }) => setSelectedCv(value)}
            value={selectedCv}
          />
        ) : (
          'Резюме еще нет'
        )}
      </Modal>
      <div className={s.buttonsApplicant}>
        <ButtonColor color='fill' width={160} onClick={() => setIsModalCvOpen(true)}>
          Откликнуться
        </ButtonColor>
        <ButtonColor disabled width={160}>
          Написать
        </ButtonColor>
      </div>
    </>
  )
}

export default VacancyPage
