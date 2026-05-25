import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0]

  return (
    <div className="flex h-screen bg-[#07090F] overflow-hidden">
      <Sidebar
        userName={userName}
        userEmail={user.email}
        plan="trial"
        trialDaysLeft={7}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
