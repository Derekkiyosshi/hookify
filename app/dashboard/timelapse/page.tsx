'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { mockCreatives } from '@/lib/mockData'

const weeklyData = [
  { week: 'Sem 18', criativo1: 78, criativo2: 71, criativo3: 65 },
  { week: 'Sem 19', criativo1: 82, criativo2: 73, criativo3: 58 },
  { week: 'Sem 20', criativo1: 88, criativo2: 74, criativo3: 50 },
  { week: 'Sem 21', criativo1: 92, criativo2: 74, criativo3: 41 },
]

const dailyData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i],
  criativo1: 88 + Math.round(Math.sin(i * 0.8) * 4),
  criativo2: 73 + Math.round(Math.cos(i * 0.6) * 3),
  criativo3: 48 + Math.round(Math.sin(i * 1.2) * 5),
}))

const colors = ['#A855F7', '#3b82f6', '#ef4444']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0D1117] border border-white/10 rounded-xl px-3 py-2 text-sm">
        <p className="text-gray-400 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function TimelapsePage() {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = period === '7d' ? dailyData : weeklyData
  const xKey = period === '7d' ? 'day' : 'week'

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Time-Lapse</h1>
          <p className="text-gray-400 text-sm mt-1">Evolução do score dos seus criativos ao longo do tempo</p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {p === '7d' ? '7 dias' : '30 dias'}
            </button>
          ))}
        </div>
      </div>

      {/* Main chart */}
      <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-1">Score ao longo do tempo</h2>
        <p className="text-gray-400 text-sm mb-6">Veja exatamente quando cada criativo oscilou</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
            <XAxis dataKey={xKey} tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => {
                const idx = parseInt(value.replace('criativo', '')) - 1
                return <span style={{ color: '#9ca3af', fontSize: 12 }}>{mockCreatives[idx]?.name.substring(0, 30)}...</span>
              }}
            />
            {mockCreatives.map((c, i) => (
              <Line
                key={c.id}
                type="monotone"
                dataKey={`criativo${i + 1}`}
                name={`criativo${i + 1}`}
                stroke={colors[i]}
                strokeWidth={2}
                dot={{ r: 4, fill: colors[i], strokeWidth: 0 }}
                activeDot={{ r: 6, fill: colors[i], stroke: '#ffffff', strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Event timeline */}
      <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Eventos importantes</h2>
        <div className="space-y-3">
          {[
            { date: 'Hoje', event: 'Criativo #1 atingiu score 92 — melhor resultado da semana', type: 'success', icon: '🚀' },
            { date: 'Há 2 dias', event: 'Criativo #3 caiu 24 pontos em 48h — possível saturação de público', type: 'warning', icon: '⚠️' },
            { date: 'Há 5 dias', event: 'Criativo #2 estabilizou após queda — hook revisado funcionou', type: 'info', icon: '📊' },
            { date: 'Há 7 dias', event: 'Criativo #1 começou a escalar após aumento de verba', type: 'success', icon: '✅' },
          ].map((e, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-base">
                {e.icon}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">{e.event}</p>
                <p className="text-gray-500 text-xs mt-0.5">{e.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro feature */}
      <div className="bg-purple-500/5 border border-dashed border-purple-500/30 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">Time-Lapse de 30 dias — Plano Pro</p>
          <p className="text-gray-400 text-sm mt-1">Veja a evolução completa e identifique sazonalidade</p>
        </div>
        <a href="/dashboard/planos" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
          Fazer upgrade
        </a>
      </div>
    </div>
  )
}
