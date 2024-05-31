import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import MainPage from './presentations/pages/main/main'
import EmployerPage from './presentations/pages/employer/employer'
import VacancyPage from './presentations/pages/vacancy/vacancy.tsx'
import CVPage from './presentations/pages/cv/cv.tsx'
import LoginPage from './presentations/pages/login/login.tsx'
import RegisterPage from './presentations/pages/register/register.tsx'
import CreateCVPage from './presentations/pages/create-cv-page/create-cv-page.tsx'
import CreateVacancyPage from './presentations/pages/create-vacancy-page/create-vacancy-page.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
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
    path: '/cv/:id',
    element: <CVPage />,
  },
  {
    path: '/cv',
    element: <Navigate to='/' />,
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
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
