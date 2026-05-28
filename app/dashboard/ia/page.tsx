'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockCreatives } from '@/lib/mockData'

const suggestedQuestions = [
  'Por que meu hook rate está baixo?',
  'Como posso melhorar a retenção no meio do vídeo?',
  'Qual criativo devo escalar agora?',
  'O que está fazendo meu criativo cair de performance?',
  'Como estruturar um CTA mais eficiente?',
]

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: `Olá! Sou a IA da Hookify, especialista em análise de criativos para Meta Ads. 🎯

Posso te ajudar a entender:
- **Por que seu criativo está perdendo audiência** e em qual segundo exato
- **Como melhorar hook, body e CTA** com base nos dados reais
- **Qual criativo escalar** e qual pausar agora
- **Como usar a Fábrica Frankstein** para criar variações inteligentes

Selecione um criativo abaixo ou me pergunte qualquer coisa!`,
  },
]

export default function IAPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCreative, setSelectedCreative] = useState<string | null>(null)
  const [usedSuggestions, setUsedSuggestions] = useState(0)
  const maxSuggestions = 5 // trial limit

  async function sendMessage(text: string) {
    if (!text.trim() || loading || usedSuggestions >= maxSuggestions) return

    const userMessage: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setUsedSuggestions(prev => prev + 1)

    // Simulated AI response (will be replaced with real Claude Haiku call)
    await new Promise(r => setTimeout(r, 1500))

    const creative = selectedCreative
      ? mockCreatives.find(c => c.id === selectedCreative)
      : null

    let response = ''

    if (text.toLowerCase().includes('hook') || text.toLowerCase().includes('primeiros')) {
      response = creative
        ? `Analisando o criativo **"${creative.name}"**:\n\nSeu hook rate está em **${creative.hookRate}%**, o que significa que ${100 - creative.hookRate}% das pessoas saem nos primeiros 3 segundos.\n\n**O que fazer:**\n1. Comece com a dor do público — não com apresentação\n2. Primeiro frame precisa parar o scroll (visual impactante ou texto chocante)\n3. Teste uma pergunta direta: "Você também sofre de...?"\n\nUse a Fábrica Frankstein para testar um novo hook mantendo seu body atual que está bem (${creative.bodyRate}%).`
        : `O hook rate ideal está entre 65-80%. Abaixo disso, o problema está nos primeiros 3 segundos.\n\n**Principais causas de hook ruim:**\n1. Início muito lento ou com apresentação\n2. Primeiro frame sem apelo visual\n3. Copy genérica que não segmenta o público\n\nSelecione um criativo para eu analisar especificamente.`
    } else if (text.toLowerCase().includes('escalar') || text.toLowerCase().includes('pausar')) {
      const best = mockCreatives.sort((a, b) => b.score - a.score)[0]
      response = `Com base nos dados atuais:\n\n✅ **Escalar:** "${best.name}" — score ${best.score}, hook rate ${best.hookRate}%, já gerando R$${best.revenue.toLocaleString('pt-BR')}\n\n⚠️ **Monitorar:** "${mockCreatives[1].name}" — estável mas com body rate caindo\n\n❌ **Pausar ou reformular:** "${mockCreatives[2].name}" — hook rate ${mockCreatives[2].hookRate}%, abaixo do aceitável. Use a Fábrica Frankstein para testar variações antes de pausar completamente.`
    } else if (text.toLowerCase().includes('cta')) {
      response = creative
        ? `O CTA rate do **"${creative.name}"** está em **${creative.ctaRate}%**.\n\n**Para melhorar:**\n1. Adicione urgência nos últimos ${creative.duration - creative.ctaStart}s: "Apenas hoje", "Últimas vagas"\n2. Repita a promessa principal antes do CTA\n3. Mostre o botão/link visualmente (na tela, não só no copy)\n4. Teste um CTA mais curto e direto\n\nUm CTA acima de 60% é excelente para o seu nicho.`
        : `Um bom CTA rate está acima de 50%. Abaixo disso, o espectador está vendo mas não agindo.\n\n**Técnicas comprovadas:**\n- Urgência real ("oferta acaba hoje")\n- Prova social rápida antes do CTA\n- CTA visual na tela (não só falado)\n- Repetição da promessa principal\n\nSelecione um criativo para análise específica.`
    } else {
      response = creative
        ? `Analisando **"${creative.name}"** (score: ${creative.score}/100):\n\nHook Rate: ${creative.hookRate}% • Body Rate: ${creative.bodyRate}% • CTA Rate: ${creative.ctaRate}%\n\nO ponto mais crítico é a queda entre o hook e o body. A retenção cai significativamente após os 3 primeiros segundos, o que indica que o início promete algo que o corpo do vídeo não entrega imediatamente.\n\n**Ação recomendada:** Teste uma transição mais rápida do hook para a dor do cliente, sem pausas ou introduções longas.`
        : `Posso analisar qualquer aspecto dos seus criativos — hook, body, CTA, retenção, ou estratégia geral.\n\nSelecione um criativo específico no painel ao lado para uma análise mais precisa, ou me faça uma pergunta sobre sua estratégia de criativos.`
    }

    const assistantMessage: Message = { role: 'assistant', content: response }
    setMessages(prev => [...prev, assistantMessage])
    setLoading(false)
  }

  return (
    <div className="flex h-full">
      {/* Sidebar — creatives */}
      <div className="w-72 border-r border-white/6 flex flex-col bg-[#0A0C13]">
        <div className="p-5 border-b border-white/6">
          <h2 className="text-white font-semibold">Criativos</h2>
          <p className="text-gray-500 text-xs mt-1">Selecione para análise específica</p>
        </div>
        <div className="flex-1 p-3 space-y-2 overflow-auto">
          <button
            onClick={() => setSelectedCreative(null)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
              !selectedCreative ? 'bg-cyan-500/15 text-white border border-cyan-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🎯 Análise geral
          </button>
          {mockCreatives.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCreative(c.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                selectedCreative === c.id ? 'bg-cyan-500/15 text-white border border-cyan-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <p className="font-medium truncate">{c.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">Score: {c.score} · Hook: {c.hookRate}%</p>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-white/6">
          <div className="bg-white/3 rounded-xl p-3">
            <p className="text-xs text-gray-400">Sugestões restantes (trial)</p>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${((maxSuggestions - usedSuggestions) / maxSuggestions) * 100}%` }} />
              </div>
              <span className="text-xs text-white font-medium">{maxSuggestions - usedSuggestions}/{maxSuggestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-cyan-600 rounded-xl flex items-center justify-center text-sm flex-shrink-0 mr-3 mt-0.5">
                  🤖
                </div>
              )}
              <div
                className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-sm'
                    : 'bg-[#0D1117] border border-white/8 text-gray-200 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-cyan-600 rounded-xl flex items-center justify-center text-sm flex-shrink-0 mr-3">🤖</div>
              <div className="bg-[#0D1117] border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-3 flex gap-2 flex-wrap">
            {suggestedQuestions.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-xl transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Trial limit */}
        {usedSuggestions >= maxSuggestions && (
          <div className="mx-6 mb-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 flex items-center justify-between">
            <p className="text-sm text-white">Limite do trial atingido</p>
            <Link href="/dashboard/planos" className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg transition-colors">
              Fazer upgrade
            </Link>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/6">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder={usedSuggestions >= maxSuggestions ? 'Limite atingido — faça upgrade' : 'Pergunte sobre seus criativos...'}
              disabled={usedSuggestions >= maxSuggestions}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-500/60 disabled:opacity-40 disabled:cursor-not-allowed"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading || usedSuggestions >= maxSuggestions}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
