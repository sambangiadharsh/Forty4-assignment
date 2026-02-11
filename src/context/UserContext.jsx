import { createContext, useContext, useEffect, useState } from 'react'
import React from 'react'
const UsersContext = createContext()

export function UserProvider({ children }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  {/* Fetch users from the API */}
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  {/* Add a new user to the context */}
  const addUser = (user) => {
    setUsers((prev) => [
      ...prev,
      {
        ...user,
        id: prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1,
      },
    ])
  }

  return (
    <UsersContext.Provider value={{ users, loading, error, addUser }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const ctx = useContext(UsersContext)
  if (!ctx) {
    throw new Error('useUsers must be used within a UserProvider')
  }
  return ctx
}

