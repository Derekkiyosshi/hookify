"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Logo ─── */
function HookifyLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = { sm: 26, md: 34, lg: 44 };
  const txt = { sm: "text-lg", md: "text-xl", lg: "text-3xl" };
  const d = dims[size];
  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg width={d} height={d} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="30" height="68" rx="8" fill="url(#lg1)" />
        <rect x="62" y="8" width="30" height="68" rx="8" fill="url(#lg1)" opacity="0.8" />
        <path d="M38 64 Q50 85 62 64" stroke="url(#lg1)" strokeWidth="11" strokeLinecap="round" fill="none" />
      </svg>
      <span className={`font-extrabold tracking-tight ${txt[size]}`}>
        <span className="text-white">Hook</span>
        <span className="gradient-text">ify</span>
      </span>
    </div>
  );
}

/* ─── Graph Mock ─── */
function RetentionGraph() {
  const values = [100, 82, 70, 63, 58, 55, 52, 50, 48, 46, 44, 43, 41, 40, 39, 37, 36, 35, 34, 32];
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShow(true); }, { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const metrics = [
    { label: "Visualizações", value: "12.4K", color: "#A78BFA" },
    { label: "Hook Rate", value: "82%", color: "#34D399" },
    { label: "Body Rate", value: "52%", color: "#60A5FA" },
    { label: "CTA Rate", value: "32%", color: "#F472B6" },
    { label: "Conversões", value: "347", color: "#FBBF24" },
    { label: "Receita", value: "R$48K", color: "#34D399" },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: "#0A0D1A",
        border: "1px solid rgba(168,85,247,0.22)",
        borderRadius: 20,
        boxShadow: "0 40px 80px rgba(124,58,237,0.15), 0 0 0 1px rgba(168,85,247,0.06)",
        overflow: "hidden",
      }}
    >
      {/* ── Titlebar ── */}
      <div style={{
        background: "#060912",
        borderBottom: "1px solid rgba(168,85,247,0.1)",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 7, alignItems: "center", marginRight: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", flexShrink: 0 }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E", flexShrink: 0 }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
        </div>
        <span style={{ color: "#4B5563", fontSize: 11, fontFamily: "monospace", flex: 1 }}>
          hookify.app — Criativo_Gancho_V3.mp4
        </span>
        <span style={{
          background: "rgba(52,211,153,0.1)",
          color: "#34D399",
          border: "1px solid rgba(52,211,153,0.25)",
          fontSize: 11,
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: 100,
          display: "flex",
          alignItems: "center",
          gap: 5,
          whiteSpace: "nowrap",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block" }} />
          Ao vivo
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "24px 24px 20px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 24, marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 0 }}>
          {["Retenção Geral", "Dispositivos", "Países"].map((t, i) => (
            <button key={t} style={{
              paddingBottom: 12,
              fontSize: 12,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? "#A855F7" : "#4B5563",
              background: "none",
              border: "none",
              borderBottom: i === 0 ? "2px solid #A855F7" : "2px solid transparent",
              cursor: "pointer",
              transition: "color .2s",
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* Chart area */}
        <div style={{ display: "flex", gap: 8, height: 180, marginBottom: 8 }}>
          {/* Y axis labels */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "right",
            paddingBottom: 2,
            color: "#374151",
            fontSize: 10,
            minWidth: 34,
          }}>
            <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
          </div>

          {/* Bars container — extra right padding so 0:30 label doesn't clip */}
          <div style={{
            flex: 1,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            paddingRight: 4,
          }}>
            {[75, 50, 25].map(p => (
              <div key={p} style={{ position: "absolute", bottom: `${p}%`, left: 0, right: 0, borderTop: "1px dashed rgba(255,255,255,0.04)" }} />
            ))}
            {values.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  borderRadius: "3px 3px 0 0",
                  height: show ? `${h}%` : "0%",
                  background: `linear-gradient(180deg, rgba(168,85,247,${0.55 + h / 280}) 0%, rgba(124,58,237,0.28) 100%)`,
                  transition: `height ${620 + i * 38}ms cubic-bezier(0.34,1.4,0.64,1)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* X axis */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 42,
          paddingRight: 4,
          marginBottom: 20,
          color: "#374151",
          fontSize: 10,
        }}>
          <span>0:00</span><span>0:08</span><span>0:15</span><span>0:23</span><span>0:30</span>
        </div>

        {/* Metrics grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {metrics.map(m => (
            <div key={m.label} style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.055)",
              borderRadius: 12,
              padding: "12px 10px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: m.color, marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 10, color: "#4B5563" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, tag, title, desc, chips }: { icon: React.ReactNode; tag: string; title: string; desc: string; chips: string[] }) {
  return (
    <div className="card-feature rounded-2xl" style={{ padding: "28px 28px 24px" }}>
      {/* Icon + tag + title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 18 }}>
        <div style={{ width: 52, height: 52, minWidth: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(168,85,247,0.22)" }}>
          {icon}
        </div>
        <div style={{ paddingTop: 2 }}>
          <span className="chip" style={{ marginBottom: 8, display: "inline-block" }}>{tag}</span>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{title}</h3>
        </div>
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "#94A3B8", marginBottom: 18 }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {chips.map(c => (
          <span key={c} style={{ fontSize: 11.5, padding: "4px 11px", borderRadius: 100, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(168,85,247,0.14)", color: "#A78BFA" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Icons ─── */
const IconGraph = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#A855F7" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16" />
  </svg>
);
const IconAI = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#A855F7" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>
);
const IconLab = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#A855F7" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M5 14.5l-1.5 5.5h17L19 14.5M5 14.5h14.5" />
  </svg>
);
const IconClock = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#A855F7" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="9" fill="rgba(124,58,237,0.18)" />
    <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Data ─── */
const features = [
  { icon: <IconGraph />, tag: "Core", title: "Gráfico do Criativo", desc: "Gráfico de retenção segundo a segundo do seu criativo. Visualize exatamente onde o público dropa e identifique pontos de melhoria com precisão cirúrgica.", chips: ["Hook Rate", "Body Rate", "CTA Rate", "Retenção"] },
  { icon: <IconAI />, tag: "IA", title: "IA de Sugestões", desc: "Chat inteligente treinado para o universo de criativos. Diagnóstico em linguagem natural, sugestões de melhorias e respostas técnicas para cada queda no gráfico.", chips: ["Diagnóstico automático", "Sugestões de copy", "Análise por bloco"] },
  { icon: <IconLab />, tag: "Exclusivo", title: "Fábrica Frankstein", desc: "Combine o melhor de cada criativo com um clique. Gancho do criativo A + body do B + CTA do C = novo criativo otimizado pronto para subir na Meta.", chips: ["Merge automático", "Variações em 1 clique", "Pronto para a Meta"] },
  { icon: <IconClock />, tag: "Analytics", title: "Time-Lapse", desc: "Histórico completo do criativo: 24h, 7 dias, 30 dias. Entenda o exato momento em que ele oscilou positivamente ou negativamente e domine a sazonalidade.", chips: ["24h / 7d / 30d", "Sazonalidade", "Histórico completo"] },
];

const plans = [
  {
    name: "Starter", price: "R$147", desc: "Para copywriters e gestores iniciando a análise profissional de criativos.",
    features: ["Até 10 criativos ativos", "Gráfico de retenção", "Métricas completas", "IA de sugestões (50/mês)", "Time-lapse 7 dias"],
    cta: "Começar agora", pro: false,
  },
  {
    name: "Pro", price: "R$297", desc: "Para operações que testam criativos em escala e precisam de velocidade.",
    features: ["Criativos ilimitados", "Gráfico de retenção", "Métricas completas", "IA de sugestões ilimitada", "Time-lapse 30 dias", "Fábrica Frankstein", "Comparação lado a lado"],
    cta: "Escolher Pro", pro: true, badge: "Mais popular",
  },
  {
    name: "Scale", price: "R$597", desc: "Para grandes operações de NUTRA, lançamentos e direct response.",
    features: ["Tudo do Pro", "Múltiplas contas Meta", "API de integração", "Relatórios personalizados", "Suporte prioritário", "Onboarding dedicado"],
    cta: "Falar com equipe", pro: false,
  },
];

/* ─── Page ─── */
export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: "#07090F", fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh" }}>

      {/* ── Navbar ── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(7,9,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(168,85,247,0.1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <HookifyLogo size="md" />
          <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden md:flex">
            {["Funcionalidades", "Planos", "Sobre"].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} style={{ color: "#6B7280", fontSize: 14, textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")}>{n}</a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn-ghost hidden md:block" style={{ padding: "8px 18px", borderRadius: 10, fontSize: 14 }}>Entrar</button>
            <button className="btn-primary" style={{ padding: "9px 20px", borderRadius: 10, fontSize: 14 }}>Começar grátis</button>
            <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: "#94A3B8", background: "none", border: "none", cursor: "pointer" }}>
              <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>
        {open && (
          <div style={{ padding: "12px 24px 20px", borderTop: "1px solid rgba(168,85,247,0.1)", display: "flex", flexDirection: "column", gap: 12 }}>
            {["Funcionalidades", "Planos", "Sobre"].map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)} style={{ color: "#9CA3AF", fontSize: 15, textDecoration: "none" }}>{n}</a>
            ))}
            <button className="btn-primary" style={{ padding: "11px", borderRadius: 10, fontSize: 14, marginTop: 4 }}>Começar grátis</button>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        {/* Orbs */}
        <div className="glow-orb" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)", top: -200, left: "50%", transform: "translateX(-50%)" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)", bottom: 0, right: "10%" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="badge" style={{ marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A855F7", animation: "pulse 2s infinite" }} />
            Plataforma de Inteligência Criativa
          </div>

          <h1 className="heading-xl" style={{ marginBottom: 20 }}>
            <span className="gradient-text-white">Pare de analisar apenas campanhas.</span>
            <br />
            <span className="gradient-text">Analise o que realmente vende: o criativo.</span>
          </h1>

          <p style={{ color: "#6B7280", fontSize: 18, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 40px" }}>
            Enquanto o mercado olha CTR e ROAS, você vai enxergar o que ninguém vê — o hook que prende, o corpo que retém e o CTA que converte.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <button className="btn-primary" style={{ padding: "14px 32px", borderRadius: 12, fontSize: 15 }}>
              Começar grátis — 7 dias
            </button>
            <button className="btn-ghost" style={{ padding: "14px 32px", borderRadius: 12, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Ver demonstração
            </button>
          </div>

          <RetentionGraph />
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ margin: "0 32px" }} className="divider" />

      {/* ── Problem ── */}
      <section id="sobre" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div className="badge" style={{ marginBottom: 20 }}>O problema</div>
          <h2 className="heading-lg" style={{ marginBottom: 16 }}>
            Toda operação faz essas perguntas.{" "}
            <span className="gradient-text">Ninguém sabe responder.</span>
          </h2>
          <p style={{ color: "#6B7280", fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 52px" }}>
            Enquanto o mercado analisa CTR e ROAS, a parte que realmente define quem escala continua invisível: o criativo.
          </p>

          {/* Pain point cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
            {[
              {
                q: "Qual criativo converte mais Upsell?",
                a: "O gestor precisa 'caçar' manualmente. Não existe sistema que entrega essa informação em tempo real.",
                emoji: "🔍",
              },
              {
                q: "Por que esse criativo morreu?",
                a: "O copy nunca tem 100% de certeza. Baseia tudo em feeling e métricas superficiais, sem visualização clara.",
                emoji: "💀",
              },
              {
                q: "Como salvar esse criativo?",
                a: "A equipe pede relatório ao gestor, analisa no Excel... Nunca existiu uma fábrica automática de novos ads.",
                emoji: "🛠️",
              },
            ].map(card => (
              <div key={card.q} style={{ background: "linear-gradient(145deg, #0E1120, #0B0E1A)", border: "1px solid rgba(168,85,247,0.12)", borderRadius: 18, padding: "28px 24px", textAlign: "left" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{card.emoji}</div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#E2E8F0", marginBottom: 12, lineHeight: 1.4 }}>"{card.q}"</p>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7 }}>{card.a}</p>
              </div>
            ))}
          </div>

          {/* Solution statement */}
          <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(168,85,247,0.06) 100%)", border: "1px solid rgba(168,85,247,0.25)", borderRadius: 16, padding: "24px 32px", display: "inline-block", maxWidth: 700 }}>
            <p style={{ fontSize: 15, color: "#D8B4FE", fontWeight: 600, lineHeight: 1.7 }}>
              A Hookify transforma essas perguntas em respostas. Não somos apenas um tracker —
              somos uma plataforma de inteligência criativa que revela{" "}
              <span style={{ color: "#fff" }}>por que determinados criativos vendem e outros não.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="funcionalidades" style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16 }}>Diferenciais</div>
            <h2 className="heading-lg">
              Tudo que você precisa para{" "}
              <span className="gradient-text">escalar criativos</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: 20 }}>
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ margin: "0 32px" }} className="divider" />

      {/* ── Pricing ── */}
      <section id="planos" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge" style={{ marginBottom: 16 }}>Planos</div>
            <h2 className="heading-lg" style={{ marginBottom: 12 }}>
              Escolha o plano certo para{" "}
              <span className="gradient-text">sua operação</span>
            </h2>
            <p style={{ color: "#6B7280", fontSize: 15 }}>Cancele quando quiser. Sem contrato.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, maxWidth: 980, margin: "0 auto" }}>
            {plans.map(p => (
              <div key={p.name} className={p.pro ? "card-price-pro" : "card-price"} style={{ borderRadius: 20, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
                {p.badge && (
                  <span style={{ display: "inline-block", background: "linear-gradient(135deg,#7C3AED,#A855F7)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", padding: "4px 12px", borderRadius: 100, marginBottom: 14, alignSelf: "flex-start" }}>
                    {p.badge}
                  </span>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{p.name}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>{p.desc}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 28 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>{p.price}</span>
                  <span style={{ color: "#6B7280", fontSize: 13 }}>/mês</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, flex: 1 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#CBD5E1" }}>
                      <IconCheck />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={p.pro ? "btn-primary" : "btn-outline"} style={{ width: "100%", padding: "13px", borderRadius: 12, fontSize: 14, fontWeight: 600 }}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", color: "#374151", fontSize: 13, marginTop: 28 }}>
            Pagamentos processados com segurança via{" "}
            <span style={{ color: "#A855F7", fontWeight: 600 }}>Stripe</span>.
            Acesso liberado automaticamente após confirmação.
          </p>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(145deg, #140F2D 0%, #0F0D20 100%)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 24, padding: "60px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div className="glow-orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <HookifyLogo size="lg" />
              <h2 className="heading-lg" style={{ margin: "24px 0 12px" }}>
                Comece a escalar seus criativos{" "}
                <span className="gradient-text">hoje.</span>
              </h2>
              <p style={{ color: "#6B7280", fontSize: 15, marginBottom: 32 }}>
                Junte-se às operações que já usam inteligência criativa para vender mais.
              </p>
              <button className="btn-primary" style={{ padding: "15px 40px", borderRadius: 12, fontSize: 15 }}>
                Criar conta grátis
              </button>
              <p style={{ color: "#374151", fontSize: 13, marginTop: 16 }}>7 dias grátis · Sem cartão · Cancele quando quiser</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(168,85,247,0.1)", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <HookifyLogo size="sm" />
          <p style={{ color: "#374151", fontSize: 13 }}>© 2026 Hookify. Todos os direitos reservados.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Termos", "Privacidade", "Contato"].map(l => (
              <a key={l} href="#" style={{ color: "#374151", fontSize: 13, textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#9CA3AF")}
                onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
