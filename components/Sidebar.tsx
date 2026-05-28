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
    <aside style={{
      width: 256, height: '100vh', flexShrink: 0,
      background: '#070910',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* Logo */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="Hookify" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span style={{
            fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Hookify</span>
        </Link>
      </div>

      {/* Trial banner */}
      {plan === 'trial' && (
        <div style={{
          margin: '12px', padding: '12px 14px', borderRadius: 14,
          background: 'rgba(0,207,255,0.05)',
          border: '1px solid rgba(0,207,255,0.18)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#00CFFF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Trial</span>
            <span style={{ fontSize: 11, color: '#00E5FF' }}>{trialDaysLeft}d restantes</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 100, marginBottom: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 100,
              background: 'linear-gradient(90deg, #00CFFF, #00FF7F)',
              width: `${Math.max(4, ((7 - trialDaysLeft) / 7) * 100)}%`,
            }} />
          </div>
          <Link href="/dashboard/planos" style={{ fontSize: 12, color: '#00CFFF', textDecoration: 'none', fontWeight: 500 }}>
            Assinar agora →
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {navItems.map(item => {
          const active = isActive(item.href)
          const locked = item.pro && !isPro
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 12,
                textDecoration: 'none',
                background: active ? 'linear-gradient(135deg, rgba(0,207,255,0.12) 0%, rgba(0,255,127,0.06) 100%)' : 'transparent',
                border: active ? '1px solid rgba(0,207,255,0.25)' : '1px solid transparent',
                color: active ? '#F2F5FA' : locked ? '#2E3845' : '#7A8594',
                fontSize: 14, fontWeight: active ? 600 : 400,
                transition: 'all 0.15s',
                boxShadow: active ? '0 0 20px rgba(0,207,255,0.06)' : 'none',
              }}
            >
              <span style={{ fontSize: 15, opacity: locked ? 0.25 : 1 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.pro && !isPro && (
                <span style={{
                  fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                  background: 'rgba(0,207,255,0.12)', color: '#00CFFF',
                  border: '1px solid rgba(0,207,255,0.22)', padding: '2px 7px', borderRadius: 100,
                }}>Pro</span>
              )}
              {active && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00CFFF', boxShadow: '0 0 8px #00CFFF', flexShrink: 0 }} />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: planos + user + logout */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8px 10px' }}>
        <Link href="/dashboard/planos" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 12px', borderRadius: 10, textDecoration: 'none',
          color: '#4A5560', fontSize: 13, marginBottom: 2,
        }}>
          <span>💳</span>
          <span>Planos</span>
        </Link>

        <Link href="/dashboard/conta" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 12px', borderRadius: 10, textDecoration: 'none', marginBottom: 2,
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(0,207,255,0.18), rgba(0,255,127,0.12))',
            border: '1px solid rgba(0,207,255,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#00CFFF',
          }}>
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#F2F5FA', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName || 'Usuário'}</p>
            <p style={{ fontSize: 10, color: '#4A5560', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userEmail || ''}</p>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', borderRadius: 10,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#4A5560', fontSize: 13, textAlign: 'left',
          }}
        >
          <span>↩</span>
          <span>Sair</span>
        </button>
      </div>
    </aside>
  )
}
