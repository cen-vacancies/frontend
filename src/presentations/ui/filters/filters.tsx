import Select from '../../components/select/select.tsx'
import type { FiltersType } from '../../../domain/api/data'
import type { Dispatch, SetStateAction } from 'react'

import config from './config.json'

import S from './filters.module.css'

type FiltersProps = {
  filters: FiltersType
  setFilters: Dispatch<SetStateAction<FiltersType>>
}

function Filters({ filters, setFilters }: FiltersProps) {
  return (
    <div className={S.filters}>
      {Object.keys(config).map((key) => {
        const { title, options, isMultiple } = config[key as keyof Omit<FiltersType, 'text'>]
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
