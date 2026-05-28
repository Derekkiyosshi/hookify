'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 10, padding: '13px 16px',
    color: '#F2F5FA', fontSize: 14, outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#060A18', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── ESQUERDA — Branding ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: '36px 52px', position: 'relative', overflow: 'hidden',
        background: '#07091A',
      }}>
        {/* Glow de fundo */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: 600, height: 600,
          background: 'radial-gradient(ellipse, rgba(0,207,255,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '0%', right: '-5%',
          width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(0,255,127,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Topo: logo + botão voltar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60, position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {/* Logo mark */}
            <div style={{
              width: 34, height: 34, borderRadius: 9, position: 'relative', flexShrink: 0,
              background: 'linear-gradient(135deg, #00FF9A 0%, #00CFFF 60%, #0088BB 100%)',
              boxShadow: '0 0 0 1px rgba(0,207,255,.30), 0 6px 20px rgba(0,207,255,.28)',
            }}>
              <div style={{
                position: 'absolute', inset: 8,
                borderLeft: '2px solid rgba(255,255,255,.9)',
                borderRight: '2px solid rgba(255,255,255,.9)',
                borderRadius: 2,
              }} />
            </div>
            <span style={{ fontSize: 19, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.02em' }}>Hookify</span>
          </Link>
          <Link href="/" style={{
            textDecoration: 'none', fontSize: 13, color: '#7A8594',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '7px 14px', transition: 'color 0.2s',
          }}>
            ← Voltar ao site
          </Link>
        </div>

        {/* Conteúdo central */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.18)',
            borderRadius: 100, padding: '5px 14px', marginBottom: 28, width: 'fit-content',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00CFFF', boxShadow: '0 0 6px #00CFFF' }} />
            <span style={{ fontSize: 12, color: '#00E5FF', fontWeight: 500, letterSpacing: '0.02em' }}>Análise de criativos para Meta Ads</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(34px, 3.5vw, 54px)', fontWeight: 800,
            lineHeight: 1.08, letterSpacing: '-0.03em', color: '#F2F5FA', marginBottom: 18,
          }}>
            Analise o que<br />
            <span style={{
              background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>realmente vende.</span>
          </h1>

          <p style={{ fontSize: 15, color: '#7A8594', lineHeight: 1.65, maxWidth: '40ch', marginBottom: 44 }}>
            A inteligência por trás dos criativos que escalam. Hookify decompõe seus anúncios segundo a segundo e mostra exatamente onde o dinheiro vaza.
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
            {[
              {
                icon: (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#00CFFF" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16"/>
                  </svg>
                ),
                title: 'Retenção segundo a segundo',
                sub: 'Mapa de calor de atenção. Veja onde o viewer abandona — e por quê.',
              },
              {
                icon: (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#00CFFF" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/>
                  </svg>
                ),
                title: 'Diagnóstico por IA',
                sub: 'Cada criativo recebe um laudo: hook, ritmo, gatilho, CTA. Acionável, não genérico.',
              },
              {
                icon: (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#00CFFF" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M5 14.5l-1.5 5.5h17L19 14.5M5 14.5h14.5"/>
                  </svg>
                ),
                title: 'Fábrica Frankenstein',
                sub: 'Recombine os melhores trechos dos seus top performers. Novos criativos em minutos.',
              },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F2F5FA', marginBottom: 3 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: '#7A8594', lineHeight: 1.5 }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Depoimento */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,207,255,0.10)',
            borderRadius: 14, padding: '20px 22px',
          }}>
            <div style={{ fontSize: 22, color: '#00CFFF', lineHeight: 1, marginBottom: 10, opacity: 0.6 }}>"</div>
            <p style={{ fontSize: 14, color: '#C2CAD8', lineHeight: 1.6, marginBottom: 16 }}>
              Aumentei meu hook rate de 34% para 71% em duas semanas. Hoje não rodo um criativo sem passar pelo Hookify primeiro.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00CFFF, #00FF7F)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#060A18', flexShrink: 0,
              }}>MR</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F2F5FA' }}>Marcos R.</div>
                <div style={{ fontSize: 12, color: '#4A5560' }}>Gestor de Tráfego · 6 contas escaladas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 40, position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: 12, color: '#4A5560' }}>© 2026 Hookify</span>
          <Link href="/termos" style={{ fontSize: 12, color: '#4A5560', textDecoration: 'none' }}>Termos</Link>
          <Link href="/privacidade" style={{ fontSize: 12, color: '#4A5560', textDecoration: 'none' }}>Privacidade</Link>
        </div>
      </div>

      {/* ── DIREITA — Form ── */}
      <div style={{
        flex: '0 0 45%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px',
        background: '#060A18',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Entrar na conta
          </h2>
          <p style={{ fontSize: 14, color: '#7A8594' }}>Bem-vindo de volta. Continue de onde parou.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#C2CAD8', marginBottom: 8 }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              required placeholder="voce@empresa.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(0,207,255,0.50)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.10)')}
            />
          </div>

          {/* Senha */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#C2CAD8' }}>Senha</label>
              <button type="button" style={{ fontSize: 12, color: '#00CFFF', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Esqueci a senha
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                required placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => (e.target.style.borderColor = 'rgba(0,207,255,0.50)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.10)')}
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#4A5560', padding: 0,
                }}
              >
                {showPassword ? (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ fontSize: 13, color: '#F87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '12px 16px' }}>
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? 'rgba(0,207,255,0.25)' : 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
              border: 'none', borderRadius: 10,
              color: '#060A18', fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 28px rgba(0,207,255,0.22)',
              marginTop: 4,
            }}
          >
            {loading ? 'Entrando...' : 'Entrar na conta →'}
          </button>
        </form>

        {/* Divisor OU */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: 12, color: '#4A5560', textTransform: 'uppercase', letterSpacing: '0.1em' }}>OU</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Google */}
        <button
          type="button"
          style={{
            width: '100%', padding: '13px',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 10, color: '#F2F5FA', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'border-color 0.2s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continuar com Google
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#7A8594', marginTop: 24 }}>
          Ainda não tem conta?{' '}
          <Link href="/signup" style={{ color: '#00CFFF', textDecoration: 'none', fontWeight: 600 }}>
            Comece grátis →
          </Link>
        </p>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#4A5560', marginTop: 20, lineHeight: 1.6 }}>
          Ao continuar, você concorda com nossos{' '}
          <Link href="/termos" style={{ color: '#4A5560', textDecoration: 'underline' }}>Termos</Link>
          {' '}e{' '}
          <Link href="/privacidade" style={{ color: '#4A5560', textDecoration: 'underline' }}>Política de Privacidade</Link>.
        </p>
        </div>
      </div>
    </div>
  )
}
