'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

interface User {
  name: string
  email: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login') // Redirect if not logged in
      } else {
        setUser({ name: user.email?.split('@')[0] || 'Unknown', email: user.email || '' })
      }
    }
    fetchUser()
  }, [router])

  if (!user) return <p>Loading...</p>

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          Profile Page
        </h2>
        <p className="text-center text-gray-600">Name: {user.name}</p>
        <p className="text-center text-gray-600">Email: {user.email}</p>
        <button
          onClick={async () => {
            await fetch('/profile/api', { method: 'POST' }) // Call API to log out
            router.push('/login') // Redirect to login after logout
          }}
          className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
