import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ContaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const name = user?.user_metadata?.full_name || 'Usuário'
  const email = user?.email || ''
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('pt-BR')
    : ''

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Minha Conta</h1>
        <p className="text-gray-400 text-sm mt-1">Gerencie seu perfil e assinatura</p>
      </div>

      {/* Profile */}
      <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 mb-4">
        <h2 className="text-white font-semibold mb-5">Perfil</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-purple-600/20 border border-purple-500/20 rounded-2xl flex items-center justify-center text-2xl font-bold text-purple-400">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{name}</p>
            <p className="text-gray-400 text-sm">{email}</p>
            <p className="text-gray-600 text-xs mt-0.5">Membro desde {createdAt}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nome completo</label>
            <input
              defaultValue={name}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/60"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              defaultValue={email}
              disabled
              className="w-full bg-white/3 border border-white/6 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"
            />
          </div>
          <button className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
            Salvar alterações
          </button>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 mb-4">
        <h2 className="text-white font-semibold mb-5">Assinatura</h2>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-center justify-between mb-4">
          <div>
            <p className="text-purple-300 font-semibold">Trial Ativo</p>
            <p className="text-gray-400 text-sm mt-0.5">7 dias grátis · Vence em breve</p>
          </div>
          <Link
            href="/dashboard/planos"
            className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            Fazer upgrade
          </Link>
        </div>
        <div className="text-sm text-gray-400 space-y-2">
          <div className="flex justify-between"><span>Criativos analisados</span><span className="text-white">3/3</span></div>
          <div className="flex justify-between"><span>Sugestões de IA</span><span className="text-white">5 totais</span></div>
          <div className="flex justify-between"><span>Fábrica Frankstein</span><span className="text-gray-600">Bloqueado</span></div>
        </div>
      </div>

      {/* Meta connection */}
      <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6 mb-4">
        <h2 className="text-white font-semibold mb-5">Conexão Meta Ads</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-xl">📘</div>
            <div>
              <p className="text-white text-sm font-medium">Meta Business</p>
              <p className="text-gray-500 text-xs">Nenhuma conta conectada</p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
            Conectar
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#0D1117] border border-white/6 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Segurança</h2>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between text-left px-4 py-3 bg-white/3 hover:bg-white/6 border border-white/8 rounded-xl transition-colors">
            <div>
              <p className="text-white text-sm font-medium">Alterar senha</p>
              <p className="text-gray-500 text-xs mt-0.5">Enviaremos um link para seu email</p>
            </div>
            <span className="text-gray-500">→</span>
          </button>
          <button className="w-full flex items-center justify-between text-left px-4 py-3 bg-red-500/5 hover:bg-red-500/10 border border-red-500/15 rounded-xl transition-colors">
            <div>
              <p className="text-red-400 text-sm font-medium">Encerrar conta</p>
              <p className="text-gray-500 text-xs mt-0.5">Todos os dados serão removidos permanentemente</p>
            </div>
            <span className="text-red-500/50">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
