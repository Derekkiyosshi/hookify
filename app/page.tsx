"use client";

import { useState, useEffect, useRef } from "react";

function HookifyLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: 28, md: 36, lg: 48 };
  const s = sizes[size];
  const textClass = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <div className="flex items-center gap-2.5">
      <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect x="8" y="10" width="28" height="65" rx="7" fill="url(#logoGrad)" />
        <rect x="64" y="10" width="28" height="65" rx="7" fill="url(#logoGrad)" opacity="0.85" />
        <path d="M36 62 Q50 82 64 62" stroke="url(#logoGrad)" strokeWidth="10" strokeLinecap="round" fill="none" />
      </svg>
      <span className={`font-bold tracking-tight ${textClass}`}>
        <span className="text-white">Hook</span>
        <span className="gradient-text-purple">ify</span>
      </span>
    </div>
  );
}

function RetentionGraphMock() {
  const bars = [100, 78, 65, 58, 54, 51, 49, 47, 46, 44, 43, 42, 40, 39, 38, 36, 35, 34, 33, 31];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const metrics = [
    { label: "Visualizações", value: "12.4K" },
    { label: "Hook Rate", value: "78%" },
    { label: "Body Rate", value: "51%" },
    { label: "CTA Rate", value: "31%" },
    { label: "Conversões", value: "347" },
    { label: "Receita", value: "R$48.2K" },
  ];

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-purple-500/20 bg-[#0D1122]">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-purple-500/10 bg-[#0a0e1a]">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-gray-400 font-mono">hookify.app — Criativo_Gancho_V3.mp4</span>
      </div>

      <div className="p-5">
        <div className="flex gap-4 mb-4 text-xs">
          {["Retenção Geral", "Dispositivos", "Países"].map((tab, i) => (
            <button key={tab} className={`pb-1 transition-colors ${i === 0 ? "text-purple-400 border-b border-purple-400" : "text-gray-500 hover:text-gray-300"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="relative h-40 flex items-end gap-1 mb-1">
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-600 pr-2">
            <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
          </div>
          <div className="ml-6 flex-1 flex items-end gap-[2px]">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-green-600/80 to-green-400/60 transition-all duration-700"
                style={{ height: visible ? `${h}%` : "0%", transitionDelay: `${i * 30}ms` }}
              />
            ))}
          </div>
        </div>
        <div className="ml-6 flex justify-between text-[10px] text-gray-600 mb-5">
          <span>0:00</span><span>0:05</span><span>0:10</span><span>0:15</span><span>0:30</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="bg-[#080B18] rounded-lg p-2.5 text-center">
              <div className="text-sm font-bold text-white">{m.value}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="url(#g1)">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16" />
      </svg>
    ),
    tag: "Core",
    title: "Gráfico do Criativo",
    desc: "Gráfico de retenção segundo a segundo do seu criativo. Visualize exatamente onde o público dropa e identifique pontos de melhoria com precisão cirúrgica.",
    metrics: ["Hook Rate", "Body Rate", "CTA Rate", "Retenção"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="url(#g2)">
        <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.699-1.32 2.407l-1.279-.288a23.605 23.605 0 00-10.447.006l-1.286.289c-1.352.304-2.319-1.4-1.317-2.402l1.407-1.407" />
      </svg>
    ),
    tag: "IA",
    title: "IA de Sugestões",
    desc: "Chat inteligente treinado para o universo de criativos. Diagnóstico em linguagem natural, sugestões de melhorias e respostas técnicas para cada queda no gráfico.",
    metrics: ["Diagnóstico automático", "Sugestões de copy", "Análise por bloco"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="url(#g3)">
        <defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    tag: "Exclusivo",
    title: "Fábrica Frankstein",
    desc: "Combine o melhor de cada criativo com um clique. Gancho do criativo A + body do criativo B + CTA do criativo C = novo criativo otimizado pronto para testar.",
    metrics: ["Merge automático", "Variações em 1 clique", "Pronto para subir na Meta"],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="url(#g4)">
        <defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tag: "Analytics",
    title: "Time-Lapse",
    desc: "Histórico completo do criativo: 24h, 7 dias, 30 dias. Entenda o exato momento em que ele oscilou e domine a sazonalidade de cada anúncio.",
    metrics: ["24h / 7d / 30d", "Sazonalidade", "Histórico de performance"],
  },
];

const plans = [
  {
    name: "Starter",
    price: "R$147",
    period: "/mês",
    desc: "Para copywriters e gestores iniciando a análise profissional de criativos.",
    features: [
      "Até 10 criativos ativos",
      "Gráfico de retenção",
      "Métricas completas",
      "IA de sugestões (50/mês)",
      "Time-lapse 7 dias",
    ],
    cta: "Começar agora",
    featured: false,
  },
  {
    name: "Pro",
    price: "R$297",
    period: "/mês",
    desc: "Para operações que testam criativos em escala e precisam de velocidade.",
    features: [
      "Criativos ilimitados",
      "Gráfico de retenção",
      "Métricas completas",
      "IA de sugestões ilimitada",
      "Time-lapse 30 dias",
      "Fábrica Frankstein",
      "Comparação lado a lado",
    ],
    cta: "Escolher Pro",
    featured: true,
    badge: "Mais popular",
  },
  {
    name: "Scale",
    price: "R$597",
    period: "/mês",
    desc: "Para grandes operações de NUTRA, lançamentos e direct response.",
    features: [
      "Tudo do Pro",
      "Múltiplas contas Meta",
      "API de integração",
      "Relatórios personalizados",
      "Suporte prioritário",
      "Onboarding dedicado",
    ],
    cta: "Falar com equipe",
    featured: false,
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#080B18", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-500/10" style={{ background: "rgba(8,11,24,0.85)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <HookifyLogo size="md" />
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
              <a href="#pricing" className="hover:text-white transition-colors">Planos</a>
              <a href="#about" className="hover:text-white transition-colors">Sobre</a>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">Entrar</button>
              <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium">Começar grátis</button>
            </div>
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm border-t border-purple-500/10 pt-4">
            <a href="#features" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Funcionalidades</a>
            <a href="#pricing" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Planos</a>
            <a href="#about" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Sobre</a>
            <button className="btn-primary px-4 py-2 rounded-lg font-medium mt-2">Começar grátis</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="hero-glow left-1/2 -translate-x-1/2 top-0 -translate-y-1/4" style={{ position: "absolute", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Plataforma de Inteligência Criativa
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
              Pare de analisar apenas{" "}
              <span className="gradient-text">campanhas.</span>
              <br />
              Analise o que realmente{" "}
              <span className="gradient-text-purple">vende: o criativo.</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Enquanto o mercado analisa CTR e ROAS, você vai enxergar o que ninguém vê:
              o hook que prende, o corpo que retém, a emoção que converte.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary px-8 py-3.5 rounded-xl text-base font-semibold w-full sm:w-auto">
                Começar grátis — 7 dias
              </button>
              <button className="btn-secondary px-8 py-3.5 rounded-xl text-base font-medium w-full sm:w-auto flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver demonstração
              </button>
            </div>
          </div>

          {/* Graph Preview */}
          <div className="max-w-3xl mx-auto">
            <RetentionGraphMock />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider mx-8" />

      {/* Problem / Big Idea */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge inline-flex px-3 py-1 rounded-full text-xs font-medium mb-6">O problema</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-snug">
            O algoritmo já encontra os compradores.{" "}
            <span className="gradient-text">O criativo é o que define quem escala.</span>
          </h2>
          <div className="text-gray-400 text-base leading-relaxed space-y-5 text-left bg-[#0D1122] border border-purple-500/10 rounded-2xl p-8">
            <p>
              Hoje o mercado acredita que performance vem de público, campanha e estrutura. Mas a verdade é que o algoritmo já encontra compradores sozinho. O que realmente define quais ofertas escalam é o criativo.
            </p>
            <p>
              O problema é que ninguém consegue medir isso de verdade. Enquanto o mercado analisa apenas métricas superficiais como CTR, CPC e ROAS, a parte mais importante do anúncio continua invisível: o hook que prende, o corpo que retém, a emoção que gera desejo e o CTA que converte.
            </p>
            <p className="text-white font-medium">
              A Hookify nasceu para resolver exatamente isso. Não somos apenas um tracker. Somos uma plataforma de inteligência criativa que transforma anúncios em dados acionáveis.
            </p>
            <p>
              Porque o futuro do tráfego não está em criar mais campanhas. Está em entender, prever e escalar os criativos certos.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4">Diferenciais</div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Tudo que você precisa para{" "}
              <span className="gradient-text-purple">escalar criativos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card-feature rounded-2xl p-7">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.12)" }}>
                    {f.icon}
                  </div>
                  <div>
                    <span className="badge text-xs px-2.5 py-0.5 rounded-full font-medium">{f.tag}</span>
                    <h3 className="text-xl font-bold mt-1.5">{f.title}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{f.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {f.metrics.map((m) => (
                    <span key={m} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(168,85,247,0.15)", color: "#C084FC" }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider mx-8" />

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4">Planos</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Escolha o plano{" "}
              <span className="gradient-text">certo para sua operação</span>
            </h2>
            <p className="text-gray-400">Cancele quando quiser. Sem contrato.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 flex flex-col ${plan.featured ? "card-pricing-featured" : "card-pricing"}`}
              >
                {plan.badge && (
                  <div className="inline-flex self-start mb-3">
                    <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", color: "white" }}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{plan.desc}</p>
                <div className="flex items-end gap-1 mb-7">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="rgba(124,58,237,0.2)" />
                        <path d="M8 12l3 3 5-5" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.featured ? "btn-primary" : "btn-secondary"}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Pagamentos processados com segurança via{" "}
            <span className="text-purple-400 font-medium">Stripe</span>.
            Acesso liberado automaticamente após confirmação.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl p-12" style={{ background: "linear-gradient(160deg, #13102a 0%, #0D1122 100%)", border: "1px solid rgba(168,85,247,0.25)" }}>
            <HookifyLogo size="lg" />
            <h2 className="text-3xl sm:text-4xl font-bold mt-6 mb-4">
              Comece a escalar seus criativos{" "}
              <span className="gradient-text-purple">hoje.</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Junte-se às operações que já usam inteligência criativa para vender mais.
            </p>
            <button className="btn-primary px-10 py-4 rounded-xl text-base font-semibold">
              Criar conta grátis
            </button>
            <p className="text-gray-500 text-sm mt-4">7 dias grátis · Sem cartão necessário · Cancele quando quiser</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/10 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <HookifyLogo size="sm" />
          <p className="text-gray-500 text-sm">© 2026 Hookify. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Termos</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contato</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
