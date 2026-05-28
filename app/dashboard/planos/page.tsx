'use client'

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
    locked: ['Fábrica Frankstein', 'Comparação lado a lado', 'Time-Lapse 30 dias'],
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
      'Dashboard da Operação',
      'Relatórios personalizados',
      'API de integração',
      'Suporte prioritário',
      'Onboarding dedicado',
    ],
    locked: [],
  },
]

function handleAssinar(planName: string) {
  alert(`Integração com Stripe em breve! Plano ${planName} estará disponível para assinatura em breve.`)
}

export default function PlanosPage() {
  return (
    <div style={{ padding: '32px', maxWidth: 1100, margin: '0 auto' }}>

      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.20)',
          borderRadius: 100, padding: '5px 14px', marginBottom: 18,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00CFFF', boxShadow: '0 0 6px #00CFFF', display: 'inline-block' }} />
          <span style={{ fontSize: 12, color: '#00E5FF', fontWeight: 500, letterSpacing: '0.02em' }}>7 dias grátis em qualquer plano</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.02em', marginBottom: 10 }}>Escolha seu plano</h1>
        <p style={{ fontSize: 15, color: '#4A5560' }}>Cancele quando quiser. Sem multa, sem fidelidade.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {plans.map(plan => (
          <div
            key={plan.name}
            style={{
              position: 'relative',
              borderRadius: 20, padding: '28px 26px',
              display: 'flex', flexDirection: 'column',
              background: plan.highlight
                ? 'linear-gradient(145deg, rgba(0,207,255,0.08) 0%, rgba(0,255,127,0.04) 100%)'
                : '#0A0D18',
              border: plan.highlight
                ? '1px solid rgba(0,207,255,0.40)'
                : '1px solid rgba(255,255,255,0.07)',
              boxShadow: plan.highlight
                ? '0 0 60px rgba(0,207,255,0.10), 0 0 0 1px rgba(0,207,255,0.08)'
                : 'none',
            }}
          >
            {/* Gradient top line for Pro */}
            {plan.highlight && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(0,207,255,0.8), rgba(0,255,127,0.6), transparent)',
                borderRadius: '20px 20px 0 0',
              }} />
            )}

            {plan.badge && (
              <div style={{
                position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: '#060A18',
                  background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
                  padding: '4px 16px', borderRadius: 100, whiteSpace: 'nowrap',
                }}>{plan.badge}</span>
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F2F5FA', marginBottom: 6 }}>{plan.name}</h2>
              <p style={{ fontSize: 13, color: '#4A5560', marginBottom: 18, lineHeight: 1.5 }}>{plan.description}</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 13, color: '#4A5560', marginBottom: 5 }}>R$</span>
                <span style={{ fontSize: 40, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.03em', lineHeight: 1 }}>{plan.price}</span>
                <span style={{ fontSize: 13, color: '#4A5560', marginBottom: 5 }}>/mês</span>
              </div>
            </div>

            <ul style={{ flex: 1, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plan.features.map(feat => (
                <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}>
                  <span style={{ color: '#00FF7F', flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ color: '#C2CAD8' }}>{feat}</span>
                </li>
              ))}
              {plan.locked.map(feat => (
                <li key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, opacity: 0.35 }}>
                  <span style={{ color: '#4A5560', flexShrink: 0, marginTop: 1 }}>✕</span>
                  <span style={{ color: '#4A5560' }}>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleAssinar(plan.name)}
              style={{
                width: '100%', padding: '13px', borderRadius: 12,
                border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600,
                background: plan.highlight
                  ? 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)'
                  : 'rgba(255,255,255,0.07)',
                color: plan.highlight ? '#060A18' : '#F2F5FA',
                boxShadow: plan.highlight ? '0 6px 24px rgba(0,207,255,0.30)' : 'none',
                transition: 'opacity 0.2s',
              }}
            >
              Assinar {plan.name} →
            </button>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#4A5560', marginTop: 32 }}>
        Tem dúvidas?{' '}
        <a href="https://wa.me/5511999999999" style={{ color: '#00CFFF', textDecoration: 'none', fontWeight: 500 }}>
          Fale com a gente no WhatsApp →
        </a>
      </p>
    </div>
  )
}
