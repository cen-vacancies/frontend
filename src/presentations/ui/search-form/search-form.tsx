import Text from '../../components/text/text.tsx'
import Input from '../../components/input/input.tsx'

import filterImage from '../../../assets/settings.svg'
import UIText from './i18n.json'

import S from './search-form.module.css'

type SearchFormProps = {
  header?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: VoidFunction
}

function SearchForm({ header, placeholder, value, onChange, onSearch }: SearchFormProps) {
  return (
    <div className={S.searchForm}>
      <p className={S.header}>
        <Text grade='title'>{header}</Text>
      </p>
      <Input placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.currentTarget.value)} />
      <div className={S.controls}>
        <button className={S.filterButton}>
          <img src={filterImage} />
        </button>
        <button className={S.searchButton} onClick={onSearch}>
          {UIText.search}
        </button>
      </div>
    </div>
  )
}

export default SearchForm
