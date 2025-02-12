'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { login, signup , logout } from './action'

interface User {
  name: string
  email: string
}

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({ name: user?.email?.split('@')[0] || 'Unknown', email: user?.email || '' })
      }
    }
    fetchUser()
  }, [])

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
            Welcome, {user.name}
          </h2>
          <p className="text-center text-gray-600">Email: {user.email}</p>
          <button
            onClick={async () => {
              await logout()
              setUser(null)
            }}
            className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">Welcome Back</h2>
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border-gray-300 p-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border-gray-300 p-2.5 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
              Log in
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <form action={signup}>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg border border-blue-500 px-4 py-2 text-blue-500 transition hover:bg-blue-500 hover:text-white"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
