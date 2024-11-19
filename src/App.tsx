import { RouterProvider } from 'react-router-dom'
import './App.css'
import { route } from './utils/routes'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <RouterProvider router={route} />
    </>
  )
}

export default App
