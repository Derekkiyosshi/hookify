import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    price: 147,
    description: 'Para gestores que estão começando a analisar criativos.',
    highlight: false,
    features: [
      '10 criativos analisados/mês',
      'Gráfico do Criativo completo',
      'Hook Rate, Body Rate e CTA Rate',
      'IA de Sugestões — 50 análises/mês',
      'Time-Lapse 7 dias',
      'Score do Criativo',
      'Notificações in-app',
    ],
    locked: [
      'Fábrica Frankstein',
      'Comparação lado a lado',
      'Time-Lapse 30 dias',
    ],
  },
  {
    name: 'Pro',
    price: 297,
    description: 'Para operações que rodam múltiplos criativos por semana.',
    highlight: true,
    badge: 'Mais popular',
    features: [
      'Criativos ilimitados',
      'Gráfico do Criativo completo',
      'Hook Rate, Body Rate e CTA Rate',
      'IA de Sugestões ilimitada',
      'Time-Lapse 30 dias',
      'Score do Criativo',
      'Fábrica Frankstein',
      'Comparação lado a lado',
      'Sistema de Repescagem automático',
      'Notificações inteligentes',
    ],
    locked: [],
  },
  {
    name: 'Scale',
    price: 597,
    description: 'Para agências e operações de alto volume com múltiplas contas.',
    highlight: false,
    features: [
      'Tudo do Pro',
      'Múltiplas contas Meta Ads',
      'Dashboard da Operação completo',
      'Relatórios personalizados',
      'API de integração',
      'Suporte prioritário',
      'Onboarding dedicado',
    ],
    locked: [],
  },
]

export default function PlanosPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-3">Escolha seu plano</h1>
        <p className="text-gray-400">
          Todos os planos incluem 7 dias grátis. Cancele quando quiser.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-6 flex flex-col ${
              plan.highlight
                ? 'bg-cyan-600/10 border-2 border-cyan-500/50'
                : 'bg-[#0D1117] border border-white/8'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-cyan-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-1">{plan.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">R${plan.price}</span>
                <span className="text-gray-400 mb-1">/mês</span>
              </div>
            </div>

            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
              {plan.locked.map(feature => (
                <li key={feature} className="flex items-start gap-2.5 text-sm opacity-40">
                  <span className="text-gray-500 mt-0.5 flex-shrink-0">✕</span>
                  <span className="text-gray-500">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                plan.highlight
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  : 'bg-white/8 hover:bg-white/12 text-white border border-white/10'
              }`}
            >
              Assinar {plan.name}
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        Tem dúvidas?{' '}
        <Link href="https://wa.me/5511999999999" className="text-cyan-400 hover:text-cyan-300 transition-colors">
          Fale com a gente no WhatsApp
        </Link>
      </p>
    </div>
  )
}
