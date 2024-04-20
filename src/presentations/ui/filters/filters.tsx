import Select from '../../components/select/select.tsx'
import Input from '../../components/input/input.tsx'
import SearchForm from '../search-form/search-form.tsx'
import type { FiltersType } from '../../../domain/api/data'
import type { Dispatch, SetStateAction } from 'react'

import config from './config.json'

import S from './filters.module.css'

type FiltersProps = {
  filters: FiltersType
  setFilters: Dispatch<SetStateAction<FiltersType>>
  onSearch?: VoidFunction
  onReset?: VoidFunction
}

function Filters({ filters, setFilters, onSearch, onReset }: FiltersProps) {
  return (
    <div className={S.filters}>
      <div className={S.header}>
        <span className={S.mainTitle}>Фильтры</span>
        <button className={S.resetButton} onClick={onReset}>
          Сбросить
        </button>
      </div>
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
      <div className={S.inputWithText}>
        <h2 className={S.filterHeader}>Опыт работы</h2>
        <div className={S.row}>
          До
          <Input height={45} width={55} />
          лет
        </div>
      </div>
      <div className={S.inputWithText}>
        <h2 className={S.filterHeader}>Зарплата</h2>
        <div className={S.row}>
          От
          <Input height={45} width={170} />
          &#8381;
        </div>
      </div>
      <div className={S.searchButton}>
        <SearchForm.SearchButton onClick={onSearch} />
      </div>
    </div>
  )
}

export default Filters
