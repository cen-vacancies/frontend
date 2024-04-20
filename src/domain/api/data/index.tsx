import { operations as ApiOperations, components } from '../../../domain/api/types/api-types.ts'

const apiUrl = 'https://cen.telegrafo.ru/api'
const apiVacancies = `${apiUrl}/vacancies`

export const vacancies = {
  searchVacancy,
}

type FiltersQuery = NonNullable<ApiOperations['CenWeb.VacancyController.search']['parameters']['query']>
export type FiltersType = {
  text: NonNullable<FiltersQuery['text']>
  'employment_types[]': NonNullable<FiltersQuery['employment_types[]']>
  education: NonNullable<FiltersQuery['education']>[]
  field_of_art: NonNullable<FiltersQuery['field_of_art']>[]
  'work_schedules[]': NonNullable<FiltersQuery['work_schedules[]']>
  preferred_salary: string
  years_of_work_experience: string
}

async function searchVacancy(filters: FiltersType): Promise<components['schemas']['VacanciesQueryResponse']> {
  const query = new URLSearchParams()
  Object.keys(filters).forEach((key) => {
    const value = filters[key as keyof FiltersType]
    if (typeof value === 'string') {
      if (value !== '') {
        query.set(key, value)
      }
      return
    }
    value.forEach((item) => {
      query.append(key, item)
    })
  })

  const response = await fetch(`${apiVacancies}/search?${query.toString()}`, { method: 'GET' })
  return await response.json()
}

const api = {
  vacancies,
}

export default api
