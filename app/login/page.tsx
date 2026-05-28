'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email ou senha incorretos. Tente novamente.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#060A18' }}>

      {/* ── Lado esquerdo — Branding ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 64px',
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid rgba(0,207,255,0.08)',
      }}>
        {/* Glow de fundo */}
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(0,207,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '0%',
          width: 400, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,255,127,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 64 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg, #00FF9A 0%, #00CFFF 60%, #0088BB 100%)',
              borderRadius: 10,
              boxShadow: '0 0 0 1px rgba(0,207,255,.35), 0 8px 24px rgba(0,207,255,.30)',
              position: 'relative',
              flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute', inset: 9,
                borderLeft: '2.5px solid rgba(255,255,255,.85)',
                borderRight: '2.5px solid rgba(255,255,255,.85)',
                borderRadius: 2,
              }} />
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#F2F5FA' }}>Hookify</span>
          </Link>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 'clamp(32px, 3.5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#F2F5FA',
            marginBottom: 20,
          }}>
            Analise o que<br />
            <span style={{
              background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>realmente vende.</span>
          </h1>
          <p style={{ fontSize: 16, color: '#7A8594', lineHeight: 1.6, maxWidth: '38ch', marginBottom: 48 }}>
            Inteligência criativa para operações de tráfego pago. Veja onde seu criativo prende, onde ele perde e quando ele morre.
          </p>

          {/* Métricas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Hook Rate', value: '82%', delta: '+14%', icon: '◆' },
              { label: 'Audiência do CTA', value: '24.4%', delta: '+3.2', icon: '◈' },
              { label: 'Faturamento', value: 'R$ 48K', delta: '+18%', icon: '◉' },
            ].map(m => (
              <div key={m.label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(0,207,255,0.08)',
                borderRadius: 12, padding: '12px 16px',
              }}>
                <span style={{ fontSize: 16, color: '#00CFFF', opacity: 0.7 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#4A5560', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>{m.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#F2F5FA', letterSpacing: '-0.01em' }}>{m.value}</div>
                </div>
                <span style={{ fontSize: 12, color: '#00FF7F', fontFamily: 'monospace', fontWeight: 600 }}>{m.delta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lado direito — Form ── */}
      <div style={{
        width: '460px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 52px',
        background: '#060A18',
        position: 'relative',
      }}>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Entrar na conta
          </h2>
          <p style={{ fontSize: 14, color: '#4A5560' }}>
            Não tem conta?{' '}
            <Link href="/signup" style={{ color: '#00CFFF', textDecoration: 'none', fontWeight: 500 }}>
              Criar grátis →
            </Link>
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#C2CAD8', marginBottom: 8 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,207,255,0.12)',
                borderRadius: 12, padding: '12px 16px',
                color: '#F2F5FA', fontSize: 14,
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(0,207,255,0.45)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,207,255,0.12)')}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#C2CAD8' }}>Senha</label>
              <button type="button" style={{ fontSize: 12, color: '#00CFFF', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Esqueci a senha
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,207,255,0.12)',
                borderRadius: 12, padding: '12px 16px',
                color: '#F2F5FA', fontSize: 14,
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(0,207,255,0.45)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,207,255,0.12)')}
            />
          </div>

          {error && (
            <div style={{
              fontSize: 13, color: '#F87171',
              background: 'rgba(248,113,113,0.08)',
              border: '1px solid rgba(248,113,113,0.2)',
              borderRadius: 10, padding: '12px 16px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? 'rgba(0,207,255,0.3)' : 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
              border: 'none', borderRadius: 12,
              color: '#060A18', fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s, transform 0.2s',
              marginTop: 4,
              boxShadow: '0 8px 24px rgba(0,207,255,0.25)',
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#4A5560', marginTop: 32 }}>
          Sem cartão · Cancele quando quiser
        </p>
      </div>
    </div>
  )
}
