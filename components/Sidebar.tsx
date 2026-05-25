'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊', locked: false },
  { href: '/dashboard/criativos', label: 'Criativos', icon: '🎬', locked: false },
  { href: '/dashboard/frankstein', label: 'Fábrica Frankstein', icon: '⚡', locked: true },
  { href: '/dashboard/timelapse', label: 'Time-Lapse', icon: '📈', locked: false },
  { href: '/dashboard/ia', label: 'IA de Sugestões', icon: '🤖', locked: false },
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

  return (
    <aside className="w-64 h-screen bg-[#0A0C13] border-r border-white/6 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/6">
        <Link href="/dashboard">
          <span className="text-xl font-bold gradient-text">Hookify</span>
        </Link>
      </div>

      {/* Trial banner */}
      {plan === 'trial' && (
        <div className="mx-3 mt-4 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide">Trial Ativo</span>
          </div>
          <p className="text-white text-sm font-medium">{trialDaysLeft} dias restantes</p>
          <Link
            href="/dashboard/planos"
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Ver planos →
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => (
          <div key={item.href}>
            {item.locked ? (
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 cursor-not-allowed select-none">
                <span className="text-base opacity-40">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
                <span className="ml-auto text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">Pro</span>
              </div>
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
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/6 px-3 py-4 space-y-1">
        <Link
          href="/dashboard/conta"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <span className="text-base">👤</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName || 'Usuário'}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail || ''}</p>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all text-left"
        >
          <span className="text-base">→</span>
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </aside>
  )
}
