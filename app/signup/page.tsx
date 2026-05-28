'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('A senha precisa ter pelo menos 8 caracteres.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })

    if (error) {
      if (error.message.includes('already registered')) {
        setError('Este email já está cadastrado. Faça login.')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
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
        <div style={{
          position: 'absolute', top: '15%', left: '5%',
          width: 500, height: 500,
          background: 'radial-gradient(ellipse, rgba(0,207,255,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '0%',
          width: 400, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,255,127,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 64 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="Hookify" style={{ width: 38, height: 38, objectFit: 'contain' }} />
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: '#F2F5FA' }}>Hookify</span>
          </Link>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 'clamp(30px, 3.2vw, 48px)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.03em', color: '#F2F5FA', marginBottom: 16,
          }}>
            Comece a escalar<br />
            <span style={{
              background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>o que realmente vende.</span>
          </h1>
          <p style={{ fontSize: 15, color: '#7A8594', lineHeight: 1.6, maxWidth: '38ch', marginBottom: 44 }}>
            7 dias grátis. Conecte suas contas do Meta, veja o gráfico de retenção dos seus criativos e entenda exatamente onde o público abandona.
          </p>

          {/* Bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Gráfico de retenção segundo a segundo',
              'IA de sugestões treinada no seu nicho',
              'Fábrica Frankstein para combinar criativos',
              'Time-Lapse: entenda a sazonalidade de cada ad',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  background: 'rgba(0,207,255,0.12)',
                  border: '1px solid rgba(0,207,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#00CFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: 14, color: '#C2CAD8' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lado direito — Form ── */}
      <div style={{
        width: '480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 52px',
        background: '#060A18',
      }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Criar conta grátis
          </h2>
          <p style={{ fontSize: 14, color: '#4A5560' }}>
            Já tem conta?{' '}
            <Link href="/login" style={{ color: '#00CFFF', textDecoration: 'none', fontWeight: 500 }}>
              Fazer login →
            </Link>
          </p>
        </div>

        {/* Trial banner */}
        <div style={{
          background: 'rgba(0,207,255,0.06)',
          border: '1px solid rgba(0,207,255,0.15)',
          borderRadius: 12, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 28,
        }}>
          <span style={{ fontSize: 18 }}>🎯</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#F2F5FA', marginBottom: 2 }}>7 dias grátis, sem cartão</p>
            <p style={{ fontSize: 12, color: '#4A5560' }}>Acesse todas as métricas dos seus criativos</p>
          </div>
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Nome completo', type: 'text', value: name, onChange: setName, placeholder: 'Seu nome' },
            { label: 'Email', type: 'email', value: email, onChange: setEmail, placeholder: 'seu@email.com' },
            { label: 'Senha', type: 'password', value: password, onChange: setPassword, placeholder: 'Mínimo 8 caracteres' },
          ].map(field => (
            <div key={field.label}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#C2CAD8', marginBottom: 7 }}>
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                required
                placeholder={field.placeholder}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(0,207,255,0.12)',
                  borderRadius: 12, padding: '12px 16px',
                  color: '#F2F5FA', fontSize: 14, outline: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(0,207,255,0.45)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(0,207,255,0.12)')}
              />
            </div>
          ))}

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
              boxShadow: '0 8px 24px rgba(0,207,255,0.25)',
              marginTop: 4,
            }}
          >
            {loading ? 'Criando conta...' : 'Começar gratuitamente →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#4A5560', marginTop: 24, lineHeight: 1.6 }}>
          Ao criar uma conta você concorda com os{' '}
          <Link href="/termos" style={{ color: '#7A8594', textDecoration: 'underline' }}>Termos de Uso</Link>
          {' '}e a{' '}
          <Link href="/privacidade" style={{ color: '#7A8594', textDecoration: 'underline' }}>Política de Privacidade</Link>
        </p>
      </div>
    </div>
  )
}
