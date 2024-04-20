import { useState } from 'react'
import { useQuery } from 'react-query'
import Page from '../../ui/page/page.tsx'
import SearchForm from '../../ui/search-form/search-form.tsx'
import VacancyCard from '../../ui/vacancy-card/vacancy-card.tsx'
import Filters from '../../ui/filters/filters.tsx'
import { FiltersType, vacancies } from '../../../domain/api/data'

import S from './main.module.css'

const filtersInitial = {
  text: '',
  'employment_types[]': [],
  education: [],
  field_of_art: [],
  'work_schedules[]': [],
  preferred_salary: '',
  years_of_work_experience: '',
}

function MainPage() {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [filters, setFilters] = useState<FiltersType>(filtersInitial)

  const { data, refetch } = useQuery(['vacancy'], () => vacancies.searchVacancy(filters))

  const handleSearch = () => {
    refetch()
    setIsFilterVisible(false)
  }

  const handleReset = () => {
    setFilters(filtersInitial)
  }

  return (
    <Page>
      <Page.Filters isVisible={isFilterVisible}>
        <Filters filters={filters} setFilters={setFilters} onSearch={handleSearch} onReset={handleReset} />
      </Page.Filters>
      <Page.Content>
        <div className={S.root}>
          <SearchForm
            header={'Какую работу вы ищете?'}
            placeholder={'Должность'}
            value={filters.text[0]}
            onChange={(val) => setFilters((prev) => ({ ...prev, text: val }))}
            onSearch={handleSearch}
            onFilterClick={() => setIsFilterVisible((prev) => !prev)}
          />
          {data?.data.map((item) => <VacancyCard key={item.title} {...item} />)}
        </div>
      </Page.Content>
    </Page>
  )
}

export default MainPage
