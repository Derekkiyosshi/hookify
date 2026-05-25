import { notFound } from 'next/navigation'
import Link from 'next/link'
import RetentionChart from '@/components/RetentionChart'
import { mockCreatives, statusConfig } from '@/lib/mockData'

function MetricCard({ label, value, sub, color = 'purple' }: { label: string; value: string; sub?: string; color?: string }) {
  const colors: Record<string, string> = {
    purple: 'border-purple-500/20 bg-purple-500/5',
    green: 'border-green-500/20 bg-green-500/5',
    blue: 'border-blue-500/20 bg-blue-500/5',
    red: 'border-red-500/20 bg-red-500/5',
  }
  return (
    <div className={`border rounded-2xl p-5 ${colors[color] || colors.purple}`}>
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  )
}

function RateBar({ label, value, description }: { label: string; value: number; description: string }) {
  const color = value >= 70 ? 'bg-green-400' : value >= 50 ? 'bg-blue-500' : value >= 35 ? 'bg-yellow-400' : 'bg-red-400'
  const textColor = value >= 70 ? 'text-green-400' : value >= 50 ? 'text-blue-400' : value >= 35 ? 'text-yellow-400' : 'text-red-400'
  return (
    <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-white font-semibold">{label}</p>
          <p className="text-gray-500 text-xs mt-0.5">{description}</p>
        </div>
        <span className={`text-2xl font-bold ${textColor}`}>{value}%</span>
      </div>
      <div className="h-2 bg-white/8 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function CreativoPage({ params }: { params: { id: string } }) {
  const creative = mockCreatives.find(c => c.id === params.id)
  if (!creative) notFound()

  const status = statusConfig[creative.status]
  const scoreColor = creative.score >= 80 ? 'text-green-400' : creative.score >= 60 ? 'text-blue-400' : creative.score >= 40 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard/criativos" className="hover:text-gray-300 transition-colors">Criativos</Link>
        <span>/</span>
        <span className="text-gray-300 truncate max-w-xs">{creative.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl border border-white/8 flex-shrink-0">
            🎬
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-white truncate">{creative.name}</h1>
            <div className="flex items-center gap-3 mt-1.5">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${status.bg} ${status.color}`}>
                {status.label}
              </span>
              <span className="text-gray-500 text-sm">{creative.duration}s de duração</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`text-5xl font-black ${scoreColor}`}>{creative.score}</div>
          <div>
            <p className="text-white font-semibold">Score</p>
            <p className="text-gray-500 text-xs">de 100</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard label="Visualizações" value={creative.views.toLocaleString('pt-BR')} sub="nos últimos 7 dias" color="blue" />
        <MetricCard label="Cliques" value={creative.clicks.toLocaleString('pt-BR')} sub={`CTR: ${((creative.clicks/creative.views)*100).toFixed(1)}%`} color="purple" />
        <MetricCard label="Vendas" value={creative.sales.toString()} sub="atribuídas ao criativo" color="green" />
        <MetricCard label="Receita" value={`R$${creative.revenue.toLocaleString('pt-BR')}`} sub={`R$${Math.round(creative.revenue/creative.sales)} por venda`} color="green" />
      </div>

      {/* Retention Graph */}
      <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-semibold text-lg">Gráfico de Retenção</h2>
            <p className="text-gray-400 text-sm mt-0.5">% de espectadores assistindo a cada segundo</p>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-green-400/60 border-dashed border-t border-green-400" /><span className="text-gray-400">Fim do Hook ({creative.hookEnd}s)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-purple-400/60 border-dashed border-t border-purple-400" /><span className="text-gray-400">Início do CTA ({creative.ctaStart}s)</span></div>
          </div>
        </div>
        <RetentionChart
          data={creative.retentionData}
          hookEnd={creative.hookEnd}
          ctaStart={creative.ctaStart}
          duration={creative.duration}
        />

        {/* Key moments */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Retenção no 3s', value: `${creative.retentionData[3]?.retention}%`, desc: 'Fim do hook' },
            { label: 'Retenção no meio', value: `${creative.retentionData[Math.floor(creative.duration/2)]?.retention}%`, desc: 'Metade do vídeo' },
            { label: 'Retenção no CTA', value: `${creative.retentionData[creative.ctaStart]?.retention}%`, desc: 'Início do CTA' },
          ].map(m => (
            <div key={m.label} className="bg-white/3 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">{m.label}</p>
              <p className="text-xl font-bold text-white mt-1">{m.value}</p>
              <p className="text-xs text-gray-600 mt-0.5">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rate breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <RateBar
          label="Hook Rate"
          value={creative.hookRate}
          description="% que assiste os primeiros 3s"
        />
        <RateBar
          label="Body Rate"
          value={creative.bodyRate}
          description="% que assiste o corpo do vídeo"
        />
        <RateBar
          label="CTA Rate"
          value={creative.ctaRate}
          description="% que chega ao call-to-action"
        />
      </div>

      {/* IA Diagnosis */}
      <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🤖</span>
          <div>
            <h2 className="text-white font-semibold">Diagnóstico da IA</h2>
            <p className="text-gray-400 text-sm">Análise automática baseada nos dados do criativo</p>
          </div>
        </div>

        {creative.score >= 80 ? (
          <div className="bg-green-400/5 border border-green-400/20 rounded-xl p-4">
            <p className="text-green-400 font-medium mb-2">✅ Criativo de alta performance</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Seu hook está funcionando excepcionalmente bem — {creative.hookRate}% dos espectadores passam dos primeiros 3 segundos, o que está acima da média do mercado (65%). O body mantém boa retenção e o CTA está convertendo bem. Recomendo escalar o investimento neste criativo.
            </p>
          </div>
        ) : creative.score >= 50 ? (
          <div className="bg-blue-400/5 border border-blue-400/20 rounded-xl p-4">
            <p className="text-blue-400 font-medium mb-2">📊 Criativo com potencial de melhoria</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              O hook está ok ({creative.hookRate}%), mas o body rate de {creative.bodyRate}% indica que o conteúdo perde audiência no meio do vídeo. Teste uma edição mais dinâmica entre os segundos 10-30. O CTA pode melhorar adicionando urgência nos últimos {creative.duration - creative.ctaStart} segundos.
            </p>
          </div>
        ) : (
          <div className="bg-red-400/5 border border-red-400/20 rounded-xl p-4">
            <p className="text-red-400 font-medium mb-2">⚠️ Criativo com problemas no hook</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              O hook rate de {creative.hookRate}% está abaixo da média — quase metade dos espectadores abandona nos primeiros 3 segundos. O problema está no início do vídeo. Use a Fábrica Frankstein para testar um hook diferente mantendo o body e CTA atuais.
            </p>
          </div>
        )}

        <Link
          href="/dashboard/ia"
          className="mt-4 flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span>💬</span> Conversar com a IA sobre este criativo →
        </Link>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0D1117] border border-dashed border-purple-500/30 rounded-2xl p-5 flex items-center gap-4">
          <span className="text-3xl">⚡</span>
          <div className="flex-1">
            <p className="text-white font-semibold">Fábrica Frankstein</p>
            <p className="text-gray-400 text-sm">Crie variações trocando hook, body ou CTA</p>
          </div>
          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Pro</span>
        </div>
        <div className="bg-[#0D1117] border border-dashed border-blue-500/30 rounded-2xl p-5 flex items-center gap-4">
          <span className="text-3xl">📈</span>
          <div className="flex-1">
            <p className="text-white font-semibold">Time-Lapse</p>
            <p className="text-gray-400 text-sm">Ver histórico de performance ao longo do tempo</p>
          </div>
          <Link href="/dashboard/timelapse" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            Ver →
          </Link>
        </div>
      </div>
    </div>
  )
}
