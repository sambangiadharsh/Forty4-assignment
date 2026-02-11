import { Link } from 'react-router-dom'
import React from 'react'

function UserCard({ user }) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-slate-900/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-xl">
      
      {/* Top section */}
      <div className="flex items-start gap-3">
        
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-500 text-sm font-bold text-white">
          {user.name?.[0]}
        </div>
        
        <div className="min-w-0 pt-2">
          <h3 className="truncate text-sm font-semibold text-slate-100">
            {user.name}
          </h3>
          
        </div>
      </div>

      {/* Info section */}
      <div className="mt-4 space-y-1.5 text-xs text-slate-300">
        <p className="truncate">
          <span className="mr-1 text-slate-400">Email:</span>
          {user.email}
        </p>
        <p className="truncate">
          <span className="mr-1 text-slate-400">Phone:</span>
          {user.phone}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[11px] uppercase tracking-wide text-slate-500">
          Profile
        </span>

        <Link
          to={`/users/${user.id}`}
          className="rounded-md bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          View →
        </Link>
      </div>
    </div>
  )
}

export default UserCard
