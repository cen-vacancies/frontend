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
  onFilterClick?: VoidFunction
}

function SearchForm({ header, placeholder, value, onChange, onSearch, onFilterClick }: SearchFormProps) {
  return (
    <div className={S.searchForm}>
      <p className={S.header}>
        <Text grade='title'>{header}</Text>
      </p>
      <div className={S.main}>
        <Input placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.currentTarget.value)} />
        <div className={S.controls}>
          <button className={S.filterButton} onClick={onFilterClick}>
            <img src={filterImage} />
          </button>
          <SearchForm.SearchButton onClick={onSearch} />
        </div>
      </div>
    </div>
  )
}

SearchForm.SearchButton = ({ onClick }: { onClick?: VoidFunction }) => (
  <button className={S.searchButton} onClick={onClick}>
    {UIText.search}
  </button>
)

export default SearchForm
