'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/criativos': 'Criativos',
  '/dashboard/ia': 'IA de Sugestões',
  '/dashboard/timelapse': 'Time-Lapse',
  '/dashboard/frankstein': 'Fábrica Frankstein',
  '/dashboard/planos': 'Planos',
  '/dashboard/conta': 'Minha Conta',
}

interface DashboardHeaderProps {
  userName?: string
  trialDaysLeft?: number
  notificationCount?: number
}

export default function DashboardHeader({ userName, trialDaysLeft = 7, notificationCount = 3 }: DashboardHeaderProps) {
  const pathname = usePathname()

  const isCreativePage = pathname.startsWith('/dashboard/criativos/') && pathname !== '/dashboard/criativos'
  const title = isCreativePage ? 'Análise do Criativo' : (pageTitles[pathname] || 'Dashboard')

  return (
    <header className="h-16 border-b border-white/6 flex items-center justify-between px-8 bg-[#07090F] flex-shrink-0">
      <h2 className="text-white font-semibold">{title}</h2>

      <div className="flex items-center gap-3">
        {trialDaysLeft <= 7 && (
          <Link
            href="/dashboard/planos"
            className="hidden sm:flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-xl transition-all"
          >
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            Trial · {trialDaysLeft} dias
          </Link>
        )}

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/8 transition-colors">
          <span className="text-lg">🔔</span>
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-cyan-600 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <Link href="/dashboard/conta">
          <div className="w-9 h-9 bg-cyan-600/30 border border-cyan-500/20 rounded-xl flex items-center justify-center text-sm font-bold text-cyan-300 hover:bg-cyan-600/40 transition-colors">
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
        </Link>
      </div>
    </header>
  )
}
