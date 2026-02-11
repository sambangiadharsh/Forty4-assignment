import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Dashboard from './pages/Dashboard'
import UserDetails from './pages/UserDetails'

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="flex min-h-screen flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users/:id" element={<UserDetails />} />
            </Routes>
          </div>
        </main>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
