import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import ApplicantPage from './presentations/pages/applicant/applicant.tsx'
import EmployerPage from './presentations/pages/employer/employer'
import VacancyPage from './presentations/pages/vacancy/vacancy.tsx'
import CVPage from './presentations/pages/cv/cv.tsx'
import LoginPage from './presentations/pages/login/login.tsx'
import RegisterPage from './presentations/pages/register/register.tsx'
import CreateCVPage from './presentations/pages/create-cv-page/create-cv-page.tsx'
import CreateVacancyPage from './presentations/pages/create-vacancy-page/create-vacancy-page.tsx'
import CreateOrgPage from './presentations/pages/create-org-page/create-org-page.tsx'
import MainPage from './presentations/pages/main/main.tsx'
import UserContextProvider from './context/user-context.tsx'
import CvListPage from './presentations/pages/cv-list/cv-list.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/applicant',
    element: <ApplicantPage />,
  },
  {
    path: '/employer',
    element: <EmployerPage />,
  },
  {
    path: '/vacancy/create',
    element: <CreateVacancyPage />,
  },
  {
    path: '/vacancy/:id',
    element: <VacancyPage />,
  },
  {
    path: '/vacancy',
    element: <Navigate to='/' />,
  },
  {
    path: '/cv/create',
    element: <CreateCVPage />,
  },
  {
    path: '/cv/list',
    element: <CvListPage />,
  },
  {
    path: '/cv/:id',
    element: <CVPage />,
  },
  {
    path: '/cv',
    element: <Navigate to='/' />,
  },
  {
    path: '/organization/create',
    element: <CreateOrgPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Helvetica Neue',
          colorPrimary: '#A2C7E0',
          colorBorder: '#A2C7E0',
          colorPrimaryBorderHover: '#A2C7E0',
          borderRadius: 10,

          colorBgContainer: '#FFFFFF',
        },
        components: {
          Upload: {
            colorFillAlter: '#FFFFFF',
          },
        },
      }}
    >
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </UserContextProvider>
    </ConfigProvider>
  )
}

export default App
