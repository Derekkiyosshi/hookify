export function generateRetentionCurve(
  duration: number,
  hookDrop: number = 30,
  bodyDrop: number = 20,
  ctaDrop: number = 15
): { second: number; retention: number }[] {
  const data = []
  for (let s = 0; s <= duration; s++) {
    let retention: number
    const hookEnd = 3
    const ctaStart = Math.floor(duration * 0.85)

    if (s === 0) {
      retention = 100
    } else if (s <= hookEnd) {
      // Hook: queda rápida inicial
      retention = 100 - (hookDrop * (s / hookEnd))
    } else if (s <= ctaStart) {
      // Body: queda gradual com pequenas variações
      const progress = (s - hookEnd) / (ctaStart - hookEnd)
      const base = (100 - hookDrop) - (bodyDrop * progress)
      const noise = (Math.sin(s * 0.8) * 1.5) + (Math.cos(s * 0.3) * 1)
      retention = base + noise
    } else {
      // CTA: queda final
      const progress = (s - ctaStart) / (duration - ctaStart)
      const base = (100 - hookDrop - bodyDrop) - (ctaDrop * progress)
      retention = base
    }
    data.push({ second: s, retention: Math.max(0, Math.round(retention * 10) / 10) })
  }
  return data
}

export const mockCreatives = [
  {
    id: '1',
    name: 'Hook Dor nas Costas — Versão 3',
    status: 'escalando' as const,
    score: 92,
    hookRate: 84,
    bodyRate: 71,
    ctaRate: 68,
    views: 48320,
    uniqueViews: 41200,
    clicks: 3890,
    sales: 127,
    revenue: 38100,
    duration: 62,
    hookEnd: 3,
    ctaStart: 53,
    retentionData: generateRetentionCurve(62, 18, 16, 12),
    trend: 'up',
    tags: ['nutra', 'dor'],
  },
  {
    id: '2',
    name: 'Antes e Depois — Nutra Slim',
    status: 'estável' as const,
    score: 74,
    hookRate: 72,
    bodyRate: 58,
    ctaRate: 51,
    views: 21540,
    uniqueViews: 18900,
    clicks: 1540,
    sales: 43,
    revenue: 12900,
    duration: 45,
    hookEnd: 3,
    ctaStart: 38,
    retentionData: generateRetentionCurve(45, 28, 22, 18),
    trend: 'stable',
    tags: ['nutra', 'emagrecimento'],
  },
  {
    id: '3',
    name: 'Depoimento Cláudia — Oferta 2',
    status: 'caindo' as const,
    score: 41,
    hookRate: 49,
    bodyRate: 32,
    ctaRate: 21,
    views: 9870,
    uniqueViews: 8400,
    clicks: 420,
    sales: 8,
    revenue: 2400,
    duration: 78,
    hookEnd: 3,
    ctaStart: 66,
    retentionData: generateRetentionCurve(78, 51, 35, 20),
    trend: 'down',
    tags: ['depoimento'],
  },
]

export const statusConfig = {
  escalando: { label: 'Escalando 🚀', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/25' },
  estável: { label: 'Estável', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/25' },
  caindo: { label: 'Caindo ⚠️', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/25' },
  morto: { label: 'Morto', color: 'text-gray-500', bg: 'bg-gray-400/10 border-gray-400/20' },
}
