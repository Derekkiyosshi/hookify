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
    <header style={{
      height: 60, flexShrink: 0,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: '#070910',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
    }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F2F5FA' }}>{title}</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {trialDaysLeft <= 7 && (
          <Link href="/dashboard/planos" style={{
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.22)',
            color: '#00E5FF', fontSize: 12, fontWeight: 500,
            padding: '6px 12px', borderRadius: 100,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00CFFF', boxShadow: '0 0 6px #00CFFF', display: 'inline-block' }} />
            Trial · {trialDaysLeft} dias
          </Link>
        )}

        {/* Notifications */}
        <button style={{
          width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
          cursor: 'pointer', position: 'relative',
        }}>
          <span style={{ fontSize: 15 }}>🔔</span>
          {notificationCount > 0 && (
            <span style={{
              position: 'absolute', top: -3, right: -3,
              width: 16, height: 16, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00CFFF, #00FF7F)',
              color: '#060A18', fontSize: 9, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {notificationCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <Link href="/dashboard/conta" style={{ textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(0,207,255,0.18), rgba(0,255,127,0.12))',
            border: '1px solid rgba(0,207,255,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#00CFFF',
          }}>
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
        </Link>
      </div>
    </header>
  )
}
