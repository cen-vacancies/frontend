export function getWorkExp(year: number, isCompact: boolean = false) {
  if (year <= 0) {
    return 'Без опыта'
  }
  if (isCompact) {
    return `${year} ${year % 10 === 1 ? 'года' : 'лет'}`
  }
  return `Опыт работы ${year} ${year % 10 === 1 ? 'года' : 'лет'}`
}
