import { useState } from 'react'
import { useQuery } from 'react-query'
import Page from '../../ui/page/page.tsx'
import SearchForm from '../../ui/search-form/search-form.tsx'
import VacancyCard from '../../ui/vacancy-card/vacancy-card.tsx'
import Filters from '../../ui/filters/filters.tsx'
import { FiltersType, vacancies } from '../../../domain/api/data'

import S from './main.module.css'

function MainPage() {
  const [filters, setFilters] = useState<FiltersType>({
    text: [],
    'employment_types[]': [],
    education: [],
    field_of_art: [],
    'work_schedules[]': [],
  })

  const { data, refetch } = useQuery(['vacancy'], () => vacancies.searchVacancy(filters), {
    enabled: false,
  })

  return (
    <Page>
      <Page.Filters>
        <Filters filters={filters} setFilters={setFilters} />
      </Page.Filters>
      <Page.Content>
        <div className={S.root}>
          <SearchForm
            header={'Какую работу вы ищете?'}
            placeholder={'Должность'}
            value={filters.text[0]}
            onChange={(val) => setFilters((prev) => ({ ...prev, text: [val] }))}
            onSearch={refetch}
          />
          {data?.data.map((item) => <VacancyCard key={item.title} {...item} />)}
        </div>
      </Page.Content>
    </Page>
  )
}

export default MainPage
