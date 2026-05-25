import Link from 'next/link'
import { mockCreatives } from '@/lib/mockData'

export default function FranksteinPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white">Fábrica Frankstein</h1>
            <span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-full font-medium">Pro</span>
          </div>
          <p className="text-gray-400 text-sm">Crie novos criativos combinando o melhor de cada um — hook, body e CTA</p>
        </div>
      </div>

      {/* Upgrade gate */}
      <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-8 mb-8 text-center">
        <div className="text-5xl mb-4">⚡</div>
        <h2 className="text-white text-xl font-bold mb-2">Disponível no Plano Pro</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
          Misture hooks, bodies e CTAs dos seus melhores criativos e gere variações prontas para subir na Meta — tudo com 1 clique.
        </p>
        <Link href="/dashboard/planos" className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Fazer upgrade para Pro — R$297/mês
        </Link>
        <p className="text-gray-600 text-xs mt-3">7 dias grátis · Cancele quando quiser</p>
      </div>

      {/* Preview (locked) */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#07090F]/80 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl mb-3 block">🔒</span>
            <p className="text-white font-medium">Desbloqueie no Plano Pro</p>
          </div>
        </div>

        <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 opacity-50 select-none">
          <h3 className="text-white font-semibold mb-5">Montar combinação</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {['Hook', 'Body', 'CTA'].map((part, pi) => (
              <div key={part} className="bg-white/3 border border-white/8 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">{part}</p>
                <div className="space-y-2">
                  {mockCreatives.map((c, i) => (
                    <div
                      key={c.id}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-sm cursor-pointer transition-colors ${
                        i === pi ? 'border-purple-500/40 bg-purple-500/10 text-white' : 'border-white/6 text-gray-400'
                      }`}
                    >
                      <span className="text-base">🎬</span>
                      <span className="truncate text-xs">{c.name.split(' — ')[0]}</span>
                      {i === pi && <span className="ml-auto text-purple-400 text-xs">✓</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white/3 border border-white/8 rounded-xl p-4">
            <div>
              <p className="text-white font-medium text-sm">Combinação selecionada</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Hook de "Hook Dor nas Costas" + Body de "Antes e Depois" + CTA de "Depoimento Cláudia"
              </p>
            </div>
            <button className="bg-purple-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl">
              Gerar criativo ⚡
            </button>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { icon: '🎯', title: '1. Escolha os blocos', desc: 'Selecione o hook, body e CTA de qualquer criativo da sua biblioteca' },
          { icon: '⚡', title: '2. Gere em 1 clique', desc: 'Nossa IA combina os vídeos automaticamente no servidor' },
          { icon: '📥', title: '3. Baixe e suba na Meta', desc: 'Criativo novo pronto para upload — sem precisar de editor de vídeo' },
        ].map(step => (
          <div key={step.title} className="bg-[#0D1117] border border-white/6 rounded-2xl p-5">
            <span className="text-2xl block mb-3">{step.icon}</span>
            <p className="text-white font-semibold text-sm mb-1">{step.title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
