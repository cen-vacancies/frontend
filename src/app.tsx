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
import Responses from './presentations/pages/responses/responses.tsx'
import VacancyListPage from './presentations/pages/vacancy-list/vacancy-list.tsx'
import OrganizationPage from './presentations/pages/organization/organization.tsx'
import UserEditPage from './presentations/pages/user-edit/user-edit.tsx'
import ChatContextProvider from './context/chat-context.tsx'
import AdminUsers from './presentations/pages/admin-users/admin-users.tsx'
import AdminOrganizations from './presentations/pages/admin-organizations/admin-organizations.tsx'
import AdminVacancies from './presentations/pages/admin-vacancies/admin-vacancies.tsx'
import AdminCvs from './presentations/pages/admin-cvs/admin-cvs.tsx'

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
    path: '/vacancy/:id/edit',
    element: <CreateVacancyPage isEdit />,
  },
  {
    path: '/vacancy',
    element: <Navigate to='/' />,
  },
  {
    path: '/vacancy/list',
    element: <VacancyListPage />,
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
    path: '/cv/:id/edit',
    element: <CreateCVPage isEdit />,
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
    path: '/organization/:id',
    element: <OrganizationPage />,
  },
  {
    path: '/organization/:id/edit',
    element: <CreateOrgPage isEdit />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/responses/send',
    element: <Responses type={'sended'} />,
  },
  {
    path: '/responses/received',
    element: <Responses type={'recieved'} />,
  },
  {
    path: '/employer/responses/send',
    element: <Responses type={'sended'} />,
  },
  {
    path: '/employer/responses/received',
    element: <Responses type={'recieved'} />,
  },
  {
    path: 'user/edit',
    element: <UserEditPage />,
  },
  {
    path: 'admin',
    element: <AdminUsers />,
  },
  {
    path: 'admin/users',
    element: <AdminUsers />,
  },
  {
    path: 'admin/users/:id/edit',
    element: <UserEditPage isModeration />,
  },
  {
    path: 'admin/organizations',
    element: <AdminOrganizations />,
  },
  {
    path: 'admin/vacancies',
    element: <AdminVacancies />,
  },
  {
    path: 'admin/cvs',
    element: <AdminCvs />,
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
          screenLG: 1024,

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
          <ChatContextProvider>
            <RouterProvider router={router} />
          </ChatContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </ConfigProvider>
  )
}

export default App
