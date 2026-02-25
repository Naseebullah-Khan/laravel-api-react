import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home, Layout, Login, Register } from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
