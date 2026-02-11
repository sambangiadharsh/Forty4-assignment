import { useMemo, useState } from 'react'
import { useUsers } from '../context/UserContext'
import React from 'react'
import UserCard from '../components/UserCard'

function Dashboard() {
  const { users, loading, error, addUser } = useUsers()
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    address:''
  })

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.trim().toLowerCase())
    )
  }, [users, search])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return

    addUser({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim() || 'N/A',

      address: {
        street: form.address.trim() || 'N/A',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
    })
    

    setForm({ name: '', email: '', phone: '', website: '' ,address:''})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800
px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header section */}
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
              Forty4  Assignment
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-100">
              User Dashboard
            </h1>
            <p className="mt-1 max-w-xl text-sm text-slate-400">
              Search, browse, and create users in a clean and modern interface.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live 
          </span>
        </header>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          
          {/* LEFT: Users */}
          <section className="space-y-4">
            
            {/* Search bar */}
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full sm:max-w-xs">
                  <label className="text-xs font-medium text-slate-300">
                    Search users
                  </label>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name…"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>

                <p className="text-xs text-slate-400">
                  Showing{' '}
                  <span className="font-semibold text-slate-200">
                    {filteredUsers.length}
                  </span>{' '}
                  of {users.length}
                </p>
              </div>
            </div>

            {/* Users grid container */}
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
              {loading && (
                <p className="text-sm text-slate-400">Loading users…</p>
              )}

              {error && (
                <p className="text-sm text-red-400">
                  Failed to load users: {error}
                </p>
              )}

              {!loading && !error && (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}

                  {!filteredUsers.length && (
                    <p className="col-span-full text-sm text-slate-400">
                      No users match your search.
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Form to create new user */}
          <aside className="rounded-xl border border-white/10 bg-slate-900/70 p-5 h-150">
            <h2 className="text-lg font-semibold text-slate-100">
              Create User
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Client-side only (no backend persistence)
            </p>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              {['name', 'email', 'phone', 'website','address'].map((field) => (
                <div key={field}>
                  <label className="text-xs font-medium capitalize text-slate-300">
                    {field}
                    {(field === 'name' || field === 'email') && (
                      <span className="text-red-400">*</span>
                    )}
                  </label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required={field === 'name' || field === 'email'}
                    placeholder={
                      field === 'name'
                        ? 'Jane Doe'
                        : field === 'email'
                        ? 'jane@example.com'
                        : ''
                    }
                    className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400/50"
              >
                Add User
              </button>
            </form>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
