import { ChangeEvent } from 'react'
import S from './select.module.css'

export type SelectProps = {
  header?: string
  options: { value: string; title: string }[]
  isMultiple?: boolean
  selectedOptions: string[]
  onSelect: (value: string[]) => void
  name: string
}

function Select({ header, options, isMultiple = false, selectedOptions, onSelect, name }: SelectProps) {
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isMultiple) {
      onSelect(
        selectedOptions.includes(value) ? selectedOptions.filter((item) => item != value) : [...selectedOptions, value],
      )
    } else {
      onSelect([value])
    }
  }

  return (
    <div>
      <h2 className={S.header}>{header}</h2>
      <div className={S.options} data-multiple={isMultiple}>
        {options.map(({ value, title }) => (
          <label key={value} className={S.option}>
            <input
              checked={selectedOptions.includes(value)}
              type={isMultiple ? 'checkbox' : 'radio'}
              name={name}
              value={value}
              onChange={handleClick}
            />
            <div className={S.icon} />
            <span className={S.optionText}>{title}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default Select
