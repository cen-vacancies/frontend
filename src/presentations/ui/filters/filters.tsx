import S from './filters.module.css'
import { useState } from 'react'
import Select from '../../components/select/select.tsx'

import { operations as ApiOperations } from '../../../domain/api/types/api-types.ts'

import config from './config.json'

type FiltersQuery = NonNullable<ApiOperations['CenWeb.VacancyController.search']['parameters']['query']>

type FiltersType = {
  employment_types: NonNullable<FiltersQuery['employment_types']>
  education: NonNullable<FiltersQuery['education']>[]
  field_of_art: NonNullable<FiltersQuery['field_of_art']>[]
  work_schedules: NonNullable<FiltersQuery['work_schedules']>
}

function Filters() {
  const [filters, setFilters] = useState<FiltersType>({
    employment_types: [],
    education: [],
    field_of_art: [],
    work_schedules: [],
  })

  return (
    <div className={S.filters}>
      {Object.keys(config).map((key) => {
        const { title, options, isMultiple } = config[key as keyof FiltersType]
        return (
          <Select
            key={key}
            header={title}
            options={options}
            isMultiple={isMultiple}
            name={key}
            selectedOptions={filters[key as keyof FiltersType]}
            onSelect={(items) => {
              setFilters((prev) => ({
                ...prev,
                [key]: items,
              }))
            }}
          />
        )
      })}
    </div>
  )
}

export default Filters
