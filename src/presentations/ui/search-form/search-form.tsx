import Text from '../../components/text/text.tsx'

import filterImage from '../../../assets/settings.svg'
import UIText from './i18n.json'

import S from './search-form.module.css'

type SearchFormProps = {
  header?: string
  placeholder?: string
}

function SearchForm({ header, placeholder }: SearchFormProps) {
  return (
    <div className={S.searchForm}>
      <p className={S.header}>
        <Text grade='title'>{header}</Text>
      </p>
      <input className={S.input} placeholder={placeholder} />
      <div className={S.controls}>
        <button className={S.filterButton}>
          <img src={filterImage} />
        </button>
        <button className={S.searchButton}>{UIText.search}</button>
      </div>
    </div>
  )
}

export default SearchForm
