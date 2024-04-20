import Page from '../../ui/page/page.tsx'
import SearchForm from '../../ui/search-form/search-form.tsx'
import VacancyCard from '../../ui/vacancy-card/vacancy-card.tsx'

import mock from './mock.json'

import S from './employer.module.css'

function EmployerPage() {
  return (
    <Page>
      <div className={S.root}>
        <SearchForm header={'Кого вы ищете?'} placeholder={'Должность'} />
        {mock.map((item) => (
          // @ts-expect-error: error while employer not ready
          <VacancyCard key={item.title} {...item} />
        ))}
      </div>
    </Page>
  )
}

export default EmployerPage
