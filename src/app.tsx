import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './presentations/pages/main/main'
import EmployerPage from './presentations/pages/employer/employer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/employer',
    element: <EmployerPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
