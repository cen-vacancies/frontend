import { useState } from 'react'
import { useQuery } from 'react-query'
import Page from '../../ui/page/page.tsx'
import SearchForm from '../../ui/search-form/search-form.tsx'
import Filters from '../../ui/filters/filters.tsx'

import { FiltersType, cvs } from '../../../domain/api/data'

import S from './employer.module.css'
import CvCard from '../../ui/cv-card/cv-card.tsx'

const filtersInitial = {
  text: '',
  'employment_types[]': [],
  education: [],
  field_of_art: [],
  'work_schedules[]': [],
  preferred_salary: '',
  years_of_work_experience: '',
  min_years_of_work_experience: '',
}

function EmployerPage() {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [filters, setFilters] = useState<FiltersType>(filtersInitial)

  const { data, refetch } = useQuery(['vacancy'], () => cvs.searchCvs(filters), {
    refetchOnWindowFocus: false,
  })

  const handleSearch = () => {
    refetch()
    setIsFilterVisible(false)
  }

  const handleReset = () => {
    setFilters(filtersInitial)
  }

  return (
    <Page>
      <Page.Aside isVisible={isFilterVisible}>
        <Filters isEmployer filters={filters} setFilters={setFilters} onSearch={handleSearch} onReset={handleReset} />
      </Page.Aside>
      <Page.Content>
        <div className={S.root}>
          <SearchForm
            header={'Кого вы ищете?'}
            placeholder={'Должность'}
            value={filters.text}
            onChange={(val) => setFilters((prev) => ({ ...prev, text: val }))}
            onSearch={handleSearch}
            onFilterClick={() => setIsFilterVisible((prev) => !prev)}
          />
          {data?.data.map((item) => <CvCard key={item.title} {...item} />)}
        </div>
      </Page.Content>
    </Page>
  )
}

export default EmployerPage
