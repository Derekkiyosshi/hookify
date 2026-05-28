import Link from 'next/link'
import { mockCreatives, statusConfig } from '@/lib/mockData'

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#3b82f6' : score >= 40 ? '#eab308' : '#ef4444'
  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff10" strokeWidth="4" />
        <circle
          cx="28" cy="28" r="24" fill="none"
          stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 150.8} 150.8`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-white">{score}</span>
      </div>
    </div>
  )
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? 'bg-green-400' : value >= 50 ? 'bg-cyan-500' : 'bg-red-400'
  return (
    <div className="flex-1">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function CriativosPage() {
  const total = mockCreatives.reduce((a, c) => ({ views: a.views + c.views, sales: a.sales + c.sales }), { views: 0, sales: 0 })

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Criativos</h1>
          <p className="text-gray-400 text-sm mt-1">{mockCreatives.length} criativos analisados · {total.views.toLocaleString('pt-BR')} views · {total.sales} vendas</p>
        </div>
        <button
          onClick={() => alert('Conecte sua conta do Meta Ads primeiro para importar criativos automaticamente.')}
          style={{
            background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
            border: 'none', borderRadius: 12, padding: '10px 18px',
            color: '#060A18', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,207,255,0.28)',
          }}>
          + Adicionar criativo
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['Todos', 'Escalando', 'Estável', 'Caindo', 'Morto'].map(f => (
          <button
            key={f}
            className={`px-4 py-1.5 rounded-xl text-sm transition-colors ${
              f === 'Todos'
                ? 'bg-cyan-600 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/8'
            }`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <select className="bg-white/5 border border-white/10 text-gray-400 text-sm rounded-xl px-3 py-1.5 focus:outline-none">
            <option>Ordenar: Score</option>
            <option>Ordenar: Views</option>
            <option>Ordenar: Vendas</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {mockCreatives.map((creative, i) => {
          const status = statusConfig[creative.status]
          return (
            <Link key={creative.id} href={`/dashboard/criativos/${creative.id}`}>
              <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 hover:border-cyan-500/30 hover:bg-[#0D1117] transition-all cursor-pointer group">
                <div className="flex items-center gap-5">
                  {/* Thumbnail */}
                  <div className="w-32 h-20 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/8 relative overflow-hidden">
                    <span className="text-3xl">🎬</span>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {Math.floor(creative.duration / 60)}:{(creative.duration % 60).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Score */}
                  <ScoreRing score={creative.score} />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-white font-semibold truncate group-hover:text-cyan-300 transition-colors">
                        {creative.name}
                      </h3>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <MetricBar label="Hook" value={creative.hookRate} />
                      <MetricBar label="Body" value={creative.bodyRate} />
                      <MetricBar label="CTA" value={creative.ctaRate} />
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-xl font-bold text-white">R${creative.revenue.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{creative.sales} vendas</p>
                    <p className="text-xs text-gray-600">{creative.views.toLocaleString('pt-BR')} views</p>
                  </div>

                  <span className="text-gray-600 group-hover:text-cyan-400 transition-colors ml-2">→</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Trial notice */}
      <div className="mt-8 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">Você está no trial — máx. 3 criativos</p>
          <p className="text-gray-400 text-xs mt-1">Faça upgrade para criativos ilimitados</p>
        </div>
        <Link href="/dashboard/planos" className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
          Ver planos
        </Link>
      </div>
    </div>
  )
}
