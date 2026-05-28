import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { mockCreatives, statusConfig } from '@/lib/mockData'

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#3b82f6' : score >= 40 ? '#eab308' : '#ef4444'
  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="#ffffff10" strokeWidth="3.5" />
        <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="3.5"
          strokeLinecap="round" strokeDasharray={`${(score / 100) * 125.6} 125.6`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{score}</span>
      </div>
    </div>
  )
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? 'bg-green-400' : value >= 50 ? 'bg-cyan-500' : 'bg-red-400'
  return (
    <div className="flex-1">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="h-1 bg-white/8 rounded-full">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
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

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{greeting}, {firstName} 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Veja o desempenho dos seus criativos hoje.</p>
        </div>
        {profile?.plan === 'trial' && (
          <Link href="/dashboard/planos" className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
            Assinar agora
          </Link>
        )}
      </div>

      {/* Connect Meta Ads banner */}
      <div className="bg-[#0D1117] border border-dashed border-blue-500/25 rounded-2xl p-5 mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-blue-500/15 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📘</div>
          <div>
            <h3 className="text-white font-semibold text-sm">Conecte sua conta do Meta Ads</h3>
            <p className="text-gray-400 text-xs mt-0.5">Sincronize seus criativos e veja a análise em tempo real.</p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-xl transition-colors text-sm whitespace-nowrap flex-shrink-0">
          Conectar Meta →
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Criativos Ativos', value: mockCreatives.length.toString(), icon: '🎬', sub: `${3 - mockCreatives.length} disponíveis no trial` },
          { label: 'Views Totais', value: totalViews.toLocaleString('pt-BR'), icon: '👁', sub: 'últimos 7 dias' },
          { label: 'Vendas', value: totalSales.toString(), icon: '💰', sub: 'via criativos' },
          { label: 'Receita', value: `R$${(totalRevenue / 1000).toFixed(0)}k`, icon: '📈', sub: `score médio: ${avgScore}` },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0D1117] border border-white/6 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-xs font-medium">{stat.label}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-600 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Creatives */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-white">Seus Criativos</h2>
        <Link href="/dashboard/criativos" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
          Ver todos →
        </Link>
      </div>

      <div className="space-y-3 mb-6">
        {mockCreatives.map(creative => {
          const status = statusConfig[creative.status]
          return (
            <Link key={creative.id} href={`/dashboard/criativos/${creative.id}`}>
              <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-5 hover:border-cyan-500/25 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/8">
                    <span className="text-xl">🎬</span>
                  </div>
                  <ScoreRing score={creative.score} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-medium text-sm truncate group-hover:text-cyan-300 transition-colors">
                        {creative.name}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <MetricBar label="Hook" value={creative.hookRate} />
                      <MetricBar label="Body" value={creative.bodyRate} />
                      <MetricBar label="CTA" value={creative.ctaRate} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-lg font-bold text-white">R${creative.revenue.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-gray-500">{creative.sales} vendas</p>
                  </div>
                  <span className="text-gray-600 group-hover:text-cyan-400 transition-colors text-sm">→</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-4">
        <Link href="/dashboard/ia" className="bg-[#0D1117] border border-white/6 hover:border-cyan-500/25 rounded-2xl p-5 transition-all group">
          <span className="text-2xl mb-3 block">🤖</span>
          <p className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors">IA de Sugestões</p>
          <p className="text-gray-500 text-xs mt-1">Pergunte sobre seus criativos</p>
        </Link>
        <Link href="/dashboard/timelapse" className="bg-[#0D1117] border border-white/6 hover:border-blue-500/25 rounded-2xl p-5 transition-all group">
          <span className="text-2xl mb-3 block">📈</span>
          <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">Time-Lapse</p>
          <p className="text-gray-500 text-xs mt-1">Evolução dos seus criativos</p>
        </Link>
        <Link href="/dashboard/frankstein" className="bg-[#0D1117] border border-white/6 hover:border-yellow-500/25 rounded-2xl p-5 transition-all group">
          <span className="text-2xl mb-3 block">⚡</span>
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm group-hover:text-yellow-300 transition-colors">Fábrica Frankstein</p>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full">Pro</span>
          </div>
          <p className="text-gray-500 text-xs mt-1">Crie variações em 1 clique</p>
        </Link>
      </div>

      {/* Trial notice */}
      {profile?.plan === 'trial' && (
        <div className="mt-6 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm">Trial expira em {trialDaysLeft} dias</p>
            <p className="text-gray-400 text-xs mt-0.5">Faça upgrade para continuar usando após o período</p>
          </div>
          <Link href="/dashboard/planos" className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
            Ver planos
          </Link>
        </div>
      )}
    </div>
  )
}
