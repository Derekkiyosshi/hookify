import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/Sidebar'
import DashboardHeader from '@/components/DashboardHeader'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan, trial_ends_at')
    .eq('id', user.id)
    .single()

  const userName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]

  const trialDaysLeft = profile?.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 7

  return (
    <div className="flex h-screen bg-[#07090F] overflow-hidden">
      <Sidebar
        userName={userName}
        userEmail={user.email}
        plan={profile?.plan || 'trial'}
        trialDaysLeft={trialDaysLeft}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          userName={userName}
          trialDaysLeft={trialDaysLeft}
          notificationCount={3}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
