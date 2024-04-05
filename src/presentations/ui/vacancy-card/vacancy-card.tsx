import Text from '../../components/text/text.tsx'
import ImageLink from '../../components/image-link/image-link.tsx'

import chatImage from '../../../assets/chat.png'
import responseImage from '../../../assets/response.png'
import inviteImage from '../../../assets/invite.png'

import S from './vacancy-card.module.css'

type VacancyCardProps = {
  header?: string
  name?: string
  tag?: string
  education?: string
  experience?: string
  rate?: string
  schedule?: string
  typeCard?: 'worker' | 'employer'
}
function VacancyCard({
  header,
  name,
  tag,
  education,
  experience,
  rate,
  schedule,
  typeCard = 'worker',
}: VacancyCardProps) {
  return (
    <div className={S.vacancyCard}>
      <div className={S.content}>
        <p className={S.header}>
          <Text grade='title'>{header}</Text>
        </p>
        <p className={S.description}>
          {name}
          <br />
          {typeCard === 'worker' ? (
            <>
              {tag}
              <br />
              {education}
              <br />
            </>
          ) : (
            <>
              {education}
              <br />
              {tag}
              <br />
            </>
          )}
          {experience}
          <br />
          <br />
          {rate}
          <br />
          {schedule}
          <br />
          <br />
        </p>
      </div>
      <div className={S.controls}>
        {typeCard === 'worker' ? <ImageLink src={responseImage} to={'/'} /> : <ImageLink src={inviteImage} to={'/'} />}
        <ImageLink src={chatImage} to={'/'} />
      </div>
    </div>
  )
}

export default VacancyCard
