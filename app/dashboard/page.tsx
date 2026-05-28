import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { mockCreatives, statusConfig } from '@/lib/mockData'

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#00CFFF' : score >= 40 ? '#eab308' : '#ef4444'
  return (
    <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
      <svg width="48" height="48" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
        <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="3.5"
          strokeLinecap="round" strokeDasharray={`${(score / 100) * 125.6} 125.6`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{score}</span>
      </div>
    </div>
  )
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? '#22c55e' : value >= 50 ? '#00CFFF' : '#ef4444'
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: '#4A5560' }}>{label}</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>{value}%</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 100, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 100 }} />
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan, trial_ends_at')
    .eq('id', user!.id)
    .single()

  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Gestor'
  const firstName = userName.split(' ')[0]

  const trialDaysLeft = profile?.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 7

  const totalViews = mockCreatives.reduce((a, c) => a + c.views, 0)
  const totalSales = mockCreatives.reduce((a, c) => a + c.sales, 0)
  const totalRevenue = mockCreatives.reduce((a, c) => a + c.revenue, 0)
  const avgScore = Math.round(mockCreatives.reduce((a, c) => a + c.score, 0) / mockCreatives.length)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  const stats = [
    { label: 'Criativos Ativos', value: mockCreatives.length.toString(), sub: '0 disponíveis no trial', color: '#00CFFF', icon: '🎬' },
    { label: 'Views Totais', value: totalViews.toLocaleString('pt-BR'), sub: 'últimos 7 dias', color: '#00E5FF', icon: '👁' },
    { label: 'Vendas', value: totalSales.toString(), sub: 'via criativos', color: '#00FF7F', icon: '💰' },
    { label: 'Receita', value: `R$${(totalRevenue / 1000).toFixed(0)}k`, sub: `score médio: ${avgScore}`, color: '#00CFFF', icon: '📈' },
  ]

  return (
    <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.02em', marginBottom: 4 }}>
            {greeting}, {firstName} 👋
          </h1>
          <p style={{ fontSize: 14, color: '#4A5560' }}>Veja o desempenho dos seus criativos hoje.</p>
        </div>
        {profile?.plan === 'trial' && (
          <Link href="/dashboard/planos" style={{
            textDecoration: 'none', fontSize: 13, fontWeight: 600, color: '#060A18',
            background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
            padding: '10px 20px', borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,207,255,0.30)',
          }}>
            Assinar agora →
          </Link>
        )}
      </div>

      {/* Meta Ads banner */}
      <div style={{
        background: 'rgba(0,207,255,0.04)',
        border: '1px solid rgba(0,207,255,0.18)',
        borderRadius: 18, padding: '18px 22px', marginBottom: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: 'rgba(0,207,255,0.10)', border: '1px solid rgba(0,207,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}>📊</div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F2F5FA', marginBottom: 3 }}>Conecte sua conta do Meta Ads</h3>
            <p style={{ fontSize: 12, color: '#4A5560' }}>Sincronize seus criativos e veja a análise em tempo real.</p>
          </div>
        </div>
        <button style={{
          fontSize: 13, fontWeight: 600, color: '#060A18',
          background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
          border: 'none', borderRadius: 10, padding: '10px 18px', cursor: 'pointer',
          whiteSpace: 'nowrap', flexShrink: 0,
          boxShadow: '0 4px 16px rgba(0,207,255,0.28)',
        }}>
          Conectar Meta →
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {stats.map(stat => (
          <div key={stat.label} style={{
            background: '#0A0D18',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 18, padding: '20px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, transparent, ${stat.color}55, transparent)`,
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#4A5560', fontWeight: 500 }}>{stat.label}</span>
              <span style={{ fontSize: 20 }}>{stat.icon}</span>
            </div>
            <p style={{ fontSize: 26, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.02em', marginBottom: 4 }}>{stat.value}</p>
            <p style={{ fontSize: 11, color: '#2E3845' }}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Criativos */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: '#F2F5FA' }}>Seus Criativos</h2>
        <Link href="/dashboard/criativos" style={{ fontSize: 13, color: '#00CFFF', textDecoration: 'none', fontWeight: 500 }}>
          Ver todos →
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {mockCreatives.map(creative => {
          const status = statusConfig[creative.status]
          return (
            <Link key={creative.id} href={`/dashboard/criativos/${creative.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#0A0D18', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'border-color 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,207,255,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
              >
                <div style={{
                  width: 72, height: 44, background: 'rgba(255,255,255,0.04)',
                  borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, fontSize: 18,
                }}>🎬</div>
                <ScoreRing score={creative.score} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 500, color: '#F2F5FA', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {creative.name}
                    </h3>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, flexShrink: 0 }} className={`${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <MetricBar label="Hook" value={creative.hookRate} />
                    <MetricBar label="Body" value={creative.bodyRate} />
                    <MetricBar label="CTA" value={creative.ctaRate} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#F2F5FA' }}>R${creative.revenue.toLocaleString('pt-BR')}</p>
                  <p style={{ fontSize: 11, color: '#4A5560' }}>{creative.sales} vendas</p>
                </div>
                <span style={{ color: '#2E3845', fontSize: 16 }}>→</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { href: '/dashboard/ia', icon: '🤖', label: 'IA de Sugestões', sub: 'Pergunte sobre seus criativos', accent: '#00CFFF' },
          { href: '/dashboard/timelapse', icon: '📈', label: 'Time-Lapse', sub: 'Evolução dos seus criativos', accent: '#00E5FF' },
          { href: '/dashboard/frankstein', icon: '⚡', label: 'Fábrica Frankstein', sub: 'Crie variações em 1 clique', accent: '#00FF7F', pro: true },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#0A0D18', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '20px',
              transition: 'border-color 0.2s, background 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${item.accent}40`; (e.currentTarget as HTMLElement).style.background = '#0C1020' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = '#0A0D18' }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12, marginBottom: 14,
                background: `${item.accent}14`, border: `1px solid ${item.accent}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>{item.icon}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#F2F5FA' }}>{item.label}</p>
                {item.pro && (
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', background: 'rgba(0,207,255,0.12)', color: '#00CFFF', border: '1px solid rgba(0,207,255,0.22)', padding: '2px 6px', borderRadius: 100 }}>Pro</span>
                )}
              </div>
              <p style={{ fontSize: 12, color: '#4A5560' }}>{item.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Trial notice */}
      {profile?.plan === 'trial' && (
        <div style={{
          marginTop: 20,
          background: 'linear-gradient(135deg, rgba(0,207,255,0.06) 0%, rgba(0,255,127,0.04) 100%)',
          border: '1px solid rgba(0,207,255,0.18)',
          borderRadius: 16, padding: '18px 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#F2F5FA', marginBottom: 3 }}>Trial expira em {trialDaysLeft} dias</p>
            <p style={{ fontSize: 12, color: '#4A5560' }}>Faça upgrade para continuar usando após o período</p>
          </div>
          <Link href="/dashboard/planos" style={{
            textDecoration: 'none', fontSize: 13, fontWeight: 600, color: '#060A18',
            background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
            padding: '10px 20px', borderRadius: 10,
            boxShadow: '0 4px 16px rgba(0,207,255,0.28)',
          }}>
            Ver planos →
          </Link>
        </div>
      )}
    </div>
  )
}
