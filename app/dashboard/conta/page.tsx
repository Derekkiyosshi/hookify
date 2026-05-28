'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ContaPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [metaConnecting, setMetaConnecting] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setName(user.user_metadata?.full_name || '')
        setEmail(user.email || '')
        setCreatedAt(user.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '')
      }
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaveMsg('')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ data: { full_name: name } })
    setSaving(false)
    setSaveMsg(error ? 'Erro ao salvar. Tente novamente.' : 'Salvo com sucesso!')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  async function handleResetPassword() {
    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard/conta`,
    })
    setResetSent(true)
    setTimeout(() => setResetSent(false), 5000)
  }

  function handleConnectMeta() {
    setMetaConnecting(true)
    setTimeout(() => {
      setMetaConnecting(false)
      alert('Integração com Meta Ads em breve! Estamos finalizando o OAuth com a Meta Marketing API.')
    }, 1000)
  }

  const card = {
    background: '#0A0D18',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 18, padding: '24px 26px', marginBottom: 14,
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 12, padding: '12px 16px',
    color: '#F2F5FA', fontSize: 14, outline: 'none',
  }

  const labelStyle = { display: 'block', fontSize: 13, color: '#7A8594', marginBottom: 8, fontWeight: 500 }

  const gradientBtn = {
    background: 'linear-gradient(135deg, #00CFFF 0%, #00FF7F 100%)',
    border: 'none', borderRadius: 12, padding: '11px 22px',
    color: '#060A18', fontSize: 13, fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,207,255,0.25)',
  }

  return (
    <div style={{ padding: '32px', maxWidth: 640, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F2F5FA', letterSpacing: '-0.02em', marginBottom: 4 }}>Minha Conta</h1>
        <p style={{ fontSize: 13, color: '#4A5560' }}>Gerencie seu perfil e assinatura</p>
      </div>

      {/* Perfil */}
      <div style={card}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,207,255,0.4), transparent)', borderRadius: '18px 18px 0 0', position: 'relative' as any }} />
        <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F2F5FA', marginBottom: 20 }}>Perfil</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(0,207,255,0.18), rgba(0,255,127,0.12))',
            border: '1px solid rgba(0,207,255,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: '#00CFFF',
          }}>
            {name.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#F2F5FA' }}>{name || 'Usuário'}</p>
            <p style={{ fontSize: 13, color: '#4A5560' }}>{email}</p>
            <p style={{ fontSize: 11, color: '#2E3845', marginTop: 2 }}>Membro desde {createdAt}</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Nome completo</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(0,207,255,0.45)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input value={email} disabled style={{ ...inputStyle, opacity: 0.4, cursor: 'not-allowed' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={handleSave} disabled={saving} style={{ ...gradientBtn, opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Salvando...' : 'Salvar alterações'}
            </button>
            {saveMsg && (
              <span style={{ fontSize: 13, color: saveMsg.includes('Erro') ? '#F87171' : '#00FF7F' }}>
                {saveMsg}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Assinatura */}
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F2F5FA', marginBottom: 20 }}>Assinatura</h2>
        <div style={{
          background: 'rgba(0,207,255,0.06)', border: '1px solid rgba(0,207,255,0.20)',
          borderRadius: 14, padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16,
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#00E5FF', marginBottom: 2 }}>Trial Ativo</p>
            <p style={{ fontSize: 12, color: '#4A5560' }}>7 dias grátis · Vence em breve</p>
          </div>
          <Link href="/dashboard/planos" style={{ ...gradientBtn, textDecoration: 'none', display: 'inline-block' }}>
            Fazer upgrade →
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Criativos analisados', value: '3/3' },
            { label: 'Sugestões de IA', value: '5 totais' },
            { label: 'Fábrica Frankstein', value: 'Bloqueado', muted: true },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#4A5560' }}>{row.label}</span>
              <span style={{ color: row.muted ? '#2E3845' : '#F2F5FA', fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meta Ads */}
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F2F5FA', marginBottom: 20 }}>Conexão Meta Ads</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(0,207,255,0.10)', border: '1px solid rgba(0,207,255,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>📊</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#F2F5FA' }}>Meta Business</p>
              <p style={{ fontSize: 12, color: '#4A5560' }}>Nenhuma conta conectada</p>
            </div>
          </div>
          <button
            onClick={handleConnectMeta}
            disabled={metaConnecting}
            style={{ ...gradientBtn, opacity: metaConnecting ? 0.6 : 1 }}
          >
            {metaConnecting ? 'Conectando...' : 'Conectar'}
          </button>
        </div>
      </div>

      {/* Segurança */}
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F2F5FA', marginBottom: 20 }}>Segurança</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={handleResetPassword}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              textAlign: 'left', padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, cursor: 'pointer', transition: 'background 0.15s',
            }}
          >
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#F2F5FA', marginBottom: 2 }}>
                {resetSent ? '✅ Email enviado! Verifique sua caixa.' : 'Alterar senha'}
              </p>
              <p style={{ fontSize: 12, color: '#4A5560' }}>Enviaremos um link para seu email</p>
            </div>
            <span style={{ color: '#4A5560', fontSize: 16 }}>→</span>
          </button>

          <button
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              textAlign: 'left', padding: '14px 16px',
              background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.12)',
              borderRadius: 12, cursor: 'pointer',
            }}
            onClick={() => {
              if (confirm('Tem certeza? Esta ação é irreversível e todos os seus dados serão removidos.')) {
                alert('Entre em contato com contato@hookify.com.br para encerrar sua conta.')
              }
            }}
          >
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#F87171', marginBottom: 2 }}>Encerrar conta</p>
              <p style={{ fontSize: 12, color: '#4A5560' }}>Todos os dados serão removidos permanentemente</p>
            </div>
            <span style={{ color: '#F87171', opacity: 0.4, fontSize: 16 }}>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
