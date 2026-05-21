import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hookify — Plataforma de Inteligência Criativa",
  description: "Pare de analisar apenas campanhas. Analise o que realmente vende: O criativo! Gráfico de retenção, IA de sugestões e Fábrica de Criativos Frankstein.",
  openGraph: {
    title: "Hookify — Plataforma de Inteligência Criativa",
    description: "Pare de analisar apenas campanhas. Analise o que realmente vende: O criativo!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
