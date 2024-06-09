export function getYearsOld(birthDate: string | null) {
  if (!birthDate) return null
  const dateNow = new Date()
  const dateBirth = new Date(birthDate)

  const year = Math.ceil((dateNow.getTime() - dateBirth.getTime()) / (1000 * 60 * 60 * 24 * 365))

  if (year === undefined || year <= 0) {
    return null
  }

  let res = `${year} лет`
  if (year % 10 === 1) res = `${year} год`
  if (2 <= year % 10 && year % 10 <= 4) res = `${year} года`
  return res
}
