import Page from '../../ui/page/page.tsx'
import SearchForm from '../../ui/search-form/search-form.tsx'
import VacancyCard from '../../ui/vacancy-card/vacancy-card.tsx'

import mock from './mock.json'

import S from './main.module.css'

function MainPage() {
  return (
    <Page>
      <div className={S.root}>
        <SearchForm header={'Какую работу вы ищете?'} placeholder={'Должность'} />
        {mock.map((item) => (
          <VacancyCard key={item.header} {...item} />
        ))}
      </div>
    </Page>
  )
}

export default MainPage
