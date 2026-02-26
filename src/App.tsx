import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Create, Home, Layout, Login, Register, Show, Update } from './pages'
import AuthRoutes from './pages/AuthRoutes'
import ProtectedRoutes from './pages/ProtectedRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/create' element={<ProtectedRoutes><Create /></ProtectedRoutes>} />
          <Route path='/posts/:id' element={<Show />} />
          <Route path='/posts/update/:id' element={<ProtectedRoutes><Update /></ProtectedRoutes>} />
          <Route path='register' element={<AuthRoutes><Register /></AuthRoutes>} />
          <Route path='login' element={<AuthRoutes><Login /></AuthRoutes>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
