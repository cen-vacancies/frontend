import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import MainPage from './presentations/pages/main/main'
import EmployerPage from './presentations/pages/employer/employer'
import VacancyPage from './presentations/pages/vacancy/vacancy.tsx'

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
    path: '/vacancy/:id',
    element: <VacancyPage />,
  },
  {
    path: '/vacancy',
    element: <Navigate to='/' />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
