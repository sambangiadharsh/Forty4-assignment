import { Link, useParams } from 'react-router-dom'
import React from 'react'
import { useUsers } from '../context/UserContext'



function UserDetails() {
  const { id } = useParams()
  const { users, loading, error } = useUsers()

  const user = users.find((u) => String(u.id) === String(id))

  function formatAddress(address) {
    if (!address) return 'Address not available'
    const parts = [address.suite, address.street, address.city, address.zipcode]
    return parts.filter(Boolean).join(', ')
  }
  

  return (
    <div className="min-h-screen from-slate-900 to-slate-800 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header */}
        <header className="flex items-start justify-between">
          <div>
            <h1 className=" font-semibold uppercase tracking-widest text-red-400">
              User Profile
            </h1>
            
            
          </div>

          <Link
            to="/"
            className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-900"
          >
            ← Back
          </Link>
        </header>

        {/* States */}
        {loading && (
          <p className="text-sm text-slate-400">Loading user details…</p>
        )}

        {error && (
          <p className="text-sm text-red-400">
            Failed to load users: {error}
          </p>
        )}

        {!loading && !error && !user && (
          <p className="text-sm text-slate-400">
            User not found.
          </p>
        )}

        {/* Profiles */}
        {!loading && !error && user && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">

            {/* Top profile block */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-500 text-lg font-bold text-white">
                {user.name?.[0]}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-100">
                  {user.name}
                </h2>
                
              </div>
            </div>

            {/* Sections */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">

              {/* Basic Info */}
              <section className="rounded-xl border border-white/10 bg-slate-950 p-4">
                <h3 className="text-sm font-semibold text-slate-200">
                  Basic Information
                </h3>

                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="text-slate-400">Email</dt>
                    <dd className="font-medium text-slate-100">
                      {user.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Phone</dt>
                    <dd className="font-medium text-slate-100">
                      {user.phone || '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Website</dt>
                    <dd className="font-medium text-slate-100">
                      {user.website || '—'}
                    </dd>
                  </div>
                </dl>
              </section>

              {/* Address */}
              <section className="rounded-xl border border-white/10 bg-slate-950 p-4">
                <h3 className="text-sm font-semibold text-slate-200">
                  Address
                </h3>
                <p className="text-sm text-slate-300">
  {formatAddress(user.address)}
</p>

               
              </section>
            </div>

          
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDetails
