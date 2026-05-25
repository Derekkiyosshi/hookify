'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/criativos', label: 'Criativos', icon: '🎬' },
  { href: '/dashboard/ia', label: 'IA de Sugestões', icon: '🤖' },
  { href: '/dashboard/timelapse', label: 'Time-Lapse', icon: '📈' },
  { href: '/dashboard/frankstein', label: 'Fábrica Frankstein', icon: '⚡', pro: true },
]

interface SidebarProps {
  userName?: string
  userEmail?: string
  plan?: string
  trialDaysLeft?: number
}

export default function Sidebar({ userName, userEmail, plan = 'trial', trialDaysLeft = 7 }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  const isPro = plan === 'pro' || plan === 'scale'

  return (
    <aside className="w-64 h-screen bg-[#0A0C13] border-r border-white/6 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/6">
        <Link href="/dashboard">
          <span className="text-xl font-bold gradient-text">Hookify</span>
        </Link>
      </div>

      {/* Trial banner */}
      {plan === 'trial' && (
        <div className="mx-3 mt-4 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide">Trial</span>
            <span className="text-xs text-purple-400">{trialDaysLeft}d restantes</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full mb-2">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${((7 - trialDaysLeft) / 7) * 100}%` }} />
          </div>
          <Link href="/dashboard/planos" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
            Assinar agora →
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(item => {
          const locked = item.pro && !isPro
          return (
            <div key={item.href}>
              {locked ? (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive(item.href)
                      ? 'bg-purple-500/15 text-white border border-purple-500/20'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span className="text-base opacity-60">{item.icon}</span>
                  <span className="text-sm flex-1">{item.label}</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-full">Pro</span>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive(item.href)
                      ? 'bg-purple-500/15 text-white border border-purple-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          )
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/6 px-3 py-3 space-y-0.5">
        <Link
          href="/dashboard/planos"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <span className="text-base">💳</span>
          <span className="text-sm">Planos</span>
        </Link>
        <Link
          href="/dashboard/conta"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <div className="w-6 h-6 bg-purple-600/30 rounded-lg flex items-center justify-center text-xs font-bold text-purple-300 flex-shrink-0">
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{userName || 'Usuário'}</p>
            <p className="text-[10px] text-gray-600 truncate">{userEmail || ''}</p>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-600 hover:text-red-400 hover:bg-red-400/5 transition-all text-left"
        >
          <span className="text-sm">↩</span>
          <span className="text-xs">Sair</span>
        </button>
      </div>
    </aside>
  )
}
