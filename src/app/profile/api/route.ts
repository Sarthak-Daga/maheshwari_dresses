import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST() {
  const supabase = await createClient() // ✅ Await the client
  await supabase.auth.signOut()

  return NextResponse.redirect('/login')
}
