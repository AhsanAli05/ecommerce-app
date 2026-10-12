import { BrowserRouter, Routes, Route } from 'react-router'
import Dashboard from '../screens/Dashboard'

export default function AppNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
