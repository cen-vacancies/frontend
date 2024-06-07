import { operations as ApiOperations, components } from '../../../domain/api/types/api-types.ts'

export const apiUrl = `${import.meta.env.VITE_API_URL}/api`
const apiVacancies = `${apiUrl}/vacancies`
const apiCvs = `${apiUrl}/cvs`
const apiOrganization = `${apiUrl}/organization`

export const getToken = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Unauthorized')
  }
  return `Bearer ${token}`
}

export const vacancies = {
  searchVacancy,
  getVacancyById,
  createVacancy,
}

type FiltersQuery = NonNullable<ApiOperations['CenWeb.VacancyController.search']['parameters']['query']>
export type FiltersType = {
  text: NonNullable<FiltersQuery['text']>
  'employment_types[]': NonNullable<FiltersQuery['employment_types[]']>
  education: NonNullable<FiltersQuery['education']>[]
  field_of_art: NonNullable<FiltersQuery['field_of_art']>[]
  'work_schedules[]': NonNullable<FiltersQuery['work_schedules[]']>
  preferred_salary: string
  years_of_work_experience?: string
  min_years_of_work_experience?: string
}

async function searchVacancy(filters: FiltersType): Promise<components['schemas']['VacanciesQueryResponse']> {
  const query = new URLSearchParams()
  Object.keys(filters).forEach((key) => {
    const value = filters[key as keyof FiltersType]
    if (typeof value === 'string' || value === undefined) {
      if (value !== '' && value !== undefined) {
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

async function getVacancyById(id?: string): Promise<components['schemas']['VacancyResponse'] | undefined> {
  if (!id) {
    return undefined
  }
  const response = await fetch(`${apiVacancies}/${id}`, { method: 'GET' })
  return await response.json()
}

async function createVacancy(data: components['schemas']['CreateVacancyRequest']['vacancy']) {
  const response = await fetch(`${apiVacancies}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify({ vacancy: data }),
  })
  if (!response.ok) {
    throw new Error('request not success')
  }
  return await response.json()
}

export const cvs = {
  searchCvs,
  getCVById,
  createCv,
}

async function searchCvs(filters: FiltersType): Promise<components['schemas']['CVsQueryResponse']> {
  const query = new URLSearchParams()
  Object.keys(filters).forEach((key) => {
    const value = filters[key as keyof FiltersType]
    if (typeof value === 'string' || value === undefined) {
      if (value !== '' && value !== undefined) {
        query.set(key, value)
      }
      return
    }
    value.forEach((item) => {
      query.append(key, item)
    })
  })

  const response = await fetch(`${apiCvs}/search?${query.toString()}`, { method: 'GET' })
  return await response.json()
}

async function getCVById(id?: string): Promise<components['schemas']['CVResponse'] | undefined> {
  if (!id) {
    return undefined
  }
  const response = await fetch(`${apiCvs}/${id}`, { method: 'GET' })
  return await response.json()
}

async function createCv(data: components['schemas']['CreateCVRequest']['cv']) {
  const response = await fetch(`${apiCvs}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify({ cv: { ...data, reviewed: true } }),
  })
  if (!response.ok) {
    throw new Error('request not success')
  }
  return await response.json()
}

export const user = {
  login,
  register,
  me,
}

async function me(): Promise<components['schemas']['UserResponse']> {
  const response = await fetch(`${apiUrl}/user`, {
    method: 'GET',
    headers: {
      Authorization: getToken(),
    },
  })
  return await response.json()
}

async function login(email: string, password: string): Promise<components['schemas']['TokenResponse']> {
  const response = await fetch(`${apiUrl}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { email, password } }),
  })
  const res = (await response.json()) as components['schemas']['TokenResponse']
  localStorage.setItem('token', res.data.token)

  return res
}

async function register(
  data: components['schemas']['CreateUserRequest']['user'],
): Promise<components['schemas']['UserResponse']> {
  const response = await fetch(`${apiUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: data }),
  })

  return await response.json()
}

export const organisations = {
  currentOrganization,
  createOrganization,
}

async function currentOrganization(): Promise<components['schemas']['OrganizationResponse']> {
  const response = await fetch(`${apiUrl}/organization`, {
    method: 'GET',
    headers: {
      Authorization: getToken(),
    },
  })
  return await response.json()
}

async function createOrganization(data: components['schemas']['CreateOrganizationRequest']['organization']) {
  const response = await fetch(`${apiOrganization}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify({ organization: data }),
  })
  if (!response.ok) {
    throw new Error('request not success')
  }
  return await response.json()
}

const api = {
  vacancies,
  cvs,
}

export async function upload(file: File) {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(`${apiUrl}/uploads/image`, {
    method: 'POST',
    headers: {
      Authorization: getToken(),
    },
    body: formData,
  })

  return response.headers.get('location')
}
export default api
