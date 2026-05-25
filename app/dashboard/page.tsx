import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const mockCreatives = [
  {
    id: '1',
    name: 'Hook Dor nas Costas — Versão 3',
    status: 'escalando',
    score: 92,
    hookRate: 84,
    bodyRate: 71,
    ctaRate: 68,
    views: 48320,
    sales: 127,
    revenue: 'R$38.100',
    thumbnail: null,
  },
  {
    id: '2',
    name: 'Antes e Depois — Nutra Slim',
    status: 'estável',
    score: 74,
    hookRate: 72,
    bodyRate: 58,
    ctaRate: 51,
    views: 21540,
    sales: 43,
    revenue: 'R$12.900',
    thumbnail: null,
  },
  {
    id: '3',
    name: 'Depoimento Cláudia — Oferta 2',
    status: 'caindo',
    score: 41,
    hookRate: 49,
    bodyRate: 32,
    ctaRate: 21,
    views: 9870,
    sales: 8,
    revenue: 'R$2.400',
    thumbnail: null,
  },
]

const statusConfig = {
  escalando: { label: 'Escalando', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  estável: { label: 'Estável', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  caindo: { label: 'Caindo', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
  morto: { label: 'Morto', color: 'text-gray-500', bg: 'bg-gray-400/10 border-gray-400/20' },
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-400 border-green-400/30 bg-green-400/10'
    : score >= 60 ? 'text-blue-400 border-blue-400/30 bg-blue-400/10'
    : score >= 40 ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10'
    : 'text-red-400 border-red-400/30 bg-red-400/10'

  return (
    <div className={`flex items-center gap-1.5 border rounded-full px-3 py-1 ${color}`}>
      <span className="text-xs font-bold">{score}</span>
      <span className="text-xs opacity-70">score</span>
    </div>
  )
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? 'bg-green-400' : value >= 50 ? 'bg-purple-500' : 'bg-red-400'
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Gestor'
  const firstName = userName.split(' ')[0]

  const totalViews = mockCreatives.reduce((a, c) => a + c.views, 0)
  const totalSales = mockCreatives.reduce((a, c) => a + c.sales, 0)
  const avgScore = Math.round(mockCreatives.reduce((a, c) => a + c.score, 0) / mockCreatives.length)

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Olá, {firstName} 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Aqui está o desempenho dos seus criativos hoje.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-500">Plano atual</p>
            <p className="text-sm font-medium text-purple-400">Trial — 7 dias restantes</p>
          </div>
          <Link
            href="/dashboard/planos"
            className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            Assinar agora
          </Link>
        </div>
      </div>

      {/* Connect Meta Ads Banner */}
      <div className="bg-[#0D1117] border border-dashed border-purple-500/30 rounded-2xl p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl">
            📘
          </div>
          <div>
            <h3 className="text-white font-semibold">Conecte sua conta do Meta Ads</h3>
            <p className="text-gray-400 text-sm mt-0.5">
              Sincronize seus criativos automaticamente e veja a análise em tempo real.
            </p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap">
          Conectar Meta Ads
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Criativos Ativos', value: mockCreatives.length.toString(), icon: '🎬', sub: 'do limite de 3 no trial' },
          { label: 'Visualizações Totais', value: totalViews.toLocaleString('pt-BR'), icon: '👁', sub: 'nos últimos 7 dias' },
          { label: 'Vendas Geradas', value: totalSales.toString(), icon: '💰', sub: 'via criativos analisados' },
          { label: 'Score Médio', value: avgScore.toString(), icon: '⭐', sub: 'da sua biblioteca atual' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0D1117] border border-white/6 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Creatives */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Seus Criativos</h2>
        <Link
          href="/dashboard/criativos"
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Ver todos →
        </Link>
      </div>

      <div className="space-y-4">
        {mockCreatives.map(creative => {
          const status = statusConfig[creative.status as keyof typeof statusConfig]
          return (
            <div
              key={creative.id}
              className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 hover:border-white/12 transition-colors"
            >
              <div className="flex items-start gap-5">
                {/* Thumbnail */}
                <div className="w-28 h-16 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/8">
                  <span className="text-2xl">🎬</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-white font-semibold text-sm truncate">{creative.name}</h3>
                    <div className={`text-xs font-medium px-2.5 py-1 rounded-full border ${status.bg} ${status.color}`}>
                      {status.label}
                    </div>
                    <ScoreBadge score={creative.score} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <MetricBar label="Hook Rate" value={creative.hookRate} />
                    <MetricBar label="Body Rate" value={creative.bodyRate} />
                    <MetricBar label="CTA Rate" value={creative.ctaRate} />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-4">
                  <p className="text-lg font-bold text-white">{creative.revenue}</p>
                  <p className="text-xs text-gray-500">{creative.sales} vendas</p>
                  <p className="text-xs text-gray-600">{creative.views.toLocaleString('pt-BR')} views</p>
                  <Link
                    href={`/dashboard/criativos/${creative.id}`}
                    className="mt-2 text-xs text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-500/50 px-3 py-1.5 rounded-lg transition-all"
                  >
                    Ver análise →
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Trial limit notice */}
      <div className="mt-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">
            Você está usando 3 de 3 criativos do trial
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Faça upgrade para analisar criativos ilimitados + Fábrica Frankstein
          </p>
        </div>
        <Link
          href="/dashboard/planos"
          className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
        >
          Ver planos
        </Link>
      </div>
    </div>
  )
}
