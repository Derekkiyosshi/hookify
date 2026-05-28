'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts'

interface RetentionChartProps {
  data: { second: number; retention: number }[]
  hookEnd?: number
  ctaStart?: number
  duration?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const sec = label
    const min = Math.floor(sec / 60)
    const s = sec % 60
    const time = min > 0 ? `${min}:${s.toString().padStart(2, '0')}` : `${s}s`
    return (
      <div className="bg-[#0D1117] border border-white/10 rounded-xl px-3 py-2 text-sm">
        <p className="text-gray-400">{time}</p>
        <p className="text-white font-bold">{payload[0].value}% assistindo</p>
      </div>
    )
  }
  return null
}

export default function RetentionChart({
  data,
  hookEnd = 3,
  ctaStart = 55,
}: RetentionChartProps) {
  return (
    <div className="w-full h-64 relative">
      {/* Zone labels */}
      <div className="absolute top-2 left-0 right-0 flex text-xs text-gray-500 pointer-events-none z-10 px-8">
        <div style={{ width: `${(hookEnd / (data.length || 60)) * 100}%` }} className="text-center text-green-400/70">
          Hook
        </div>
        <div className="flex-1 text-center">Body</div>
        <div style={{ width: `${((data.length - ctaStart) / (data.length || 60)) * 100}%` }} className="text-center text-cyan-400/70">
          CTA
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 24, right: 16, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00CFFF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00CFFF" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
          <XAxis
            dataKey="second"
            tick={{ fill: '#6b7280', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={s => s % 10 === 0 ? (s >= 60 ? `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}` : `${s}s`) : ''}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={v => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#00CFFF', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <ReferenceLine x={hookEnd} stroke="#22c55e" strokeDasharray="4 4" strokeOpacity={0.4} />
          <ReferenceLine x={ctaStart} stroke="#00CFFF" strokeDasharray="4 4" strokeOpacity={0.4} />
          <Area
            type="monotone"
            dataKey="retention"
            stroke="#00CFFF"
            strokeWidth={2}
            fill="url(#retentionGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#00CFFF', stroke: '#ffffff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
