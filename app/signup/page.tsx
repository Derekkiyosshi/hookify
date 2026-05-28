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
      options: {
        data: { full_name: name },
      },
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
    <div className="min-h-screen flex items-center justify-center bg-[#07090F] px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold gradient-text">Hookify</span>
          </Link>
          <p className="text-gray-400 mt-3 text-sm">Crie sua conta — 7 dias grátis</p>
        </div>

        <div className="bg-white/3 border border-white/8 rounded-2xl p-8 backdrop-blur-sm">
          {/* Trial banner */}
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
            <span className="text-cyan-400 text-lg">🎯</span>
            <div>
              <p className="text-white text-sm font-medium">7 dias grátis, sem cartão</p>
              <p className="text-gray-400 text-xs">Acesse todas as métricas dos seus criativos</p>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Seu nome"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Mínimo 8 caracteres"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all text-sm"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm mt-2"
            >
              {loading ? 'Criando conta...' : 'Começar gratuitamente →'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-5">
            Já tem conta?{' '}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              Fazer login
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Ao criar uma conta você concorda com os{' '}
          <Link href="/termos" className="text-gray-500 hover:text-gray-400 underline transition-colors">
            Termos de Uso
          </Link>{' '}
          e a{' '}
          <Link href="/privacidade" className="text-gray-500 hover:text-gray-400 underline transition-colors">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  )
}
