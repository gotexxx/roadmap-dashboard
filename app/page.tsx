"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Terminal, Cloud, Cpu, GitBranch, Box, Network, Activity,
  Brain, Zap, ArrowRight, TrendingUp, Star, CheckCircle2,
  ChevronRight, Code2, Layers, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const careerSteps = [
  { role: "Fullstack Dev", icon: Code2, colorClass: "text-zinc-400", bgClass: "bg-zinc-500/10", desc: "Aktueller Stand" },
  { role: "Junior DevOps", icon: GitBranch, colorClass: "text-blue-400", bgClass: "bg-blue-500/10", desc: "3–6 Monate" },
  { role: "Cloud Engineer", icon: Cloud, colorClass: "text-violet-400", bgClass: "bg-violet-500/10", desc: "6–12 Monate" },
  { role: "KI-Ingenieur", icon: Brain, colorClass: "text-emerald-400", bgClass: "bg-emerald-500/10", desc: "12–18 Monate" },
  { role: "Platform Engineer", icon: Network, colorClass: "text-orange-400", bgClass: "bg-orange-500/10", desc: "18–24 Monate" },
];

const techStack = [
  { name: "Linux & Bash", icon: Terminal, color: "text-emerald-400" },
  { name: "Docker", icon: Box, color: "text-blue-400" },
  { name: "CI/CD", icon: GitBranch, color: "text-violet-400" },
  { name: "AWS Cloud", icon: Cloud, color: "text-orange-400" },
  { name: "Terraform", icon: Layers, color: "text-purple-400" },
  { name: "Kubernetes", icon: Network, color: "text-cyan-400" },
  { name: "Monitoring", icon: Activity, color: "text-yellow-400" },
  { name: "KI-Infrastruktur", icon: Cpu, color: "text-pink-400" },
  { name: "RAG-Systeme", icon: Brain, color: "text-rose-400" },
  { name: "KI-APIs", icon: Zap, color: "text-amber-400" },
  { name: "System Design", icon: Shield, color: "text-slate-400" },
];

const features = [
  { icon: TrendingUp, title: "XP-System & Level", desc: "Verfolge deinen Fortschritt wie in einem RPG — jede Fähigkeit bringt XP und ein neues Karriere-Level" },
  { icon: Star, title: "11 Roadmap-Sektionen", desc: "Vollständiger Pfad von Linux über Kubernetes bis KI-Engineering" },
  { icon: CheckCircle2, title: "Projekte mit Checklisten", desc: "5 echte Portfolio-Projekte mit Architekturübersicht und Deployment-Anleitungen" },
  { icon: Brain, title: "KI-Engineering-Sektion", desc: "RAG, Vektordatenbanken, LLM-APIs, KI-Infrastruktur" },
  { icon: Activity, title: "DevOps-Dashboard", desc: "Simulierte K8s-Metriken, Deployment-Logs, CI/CD-Pipeline-Animationen" },
  { icon: Cloud, title: "Cloud Lab", desc: "Simuliere Deployments, Kubernetes-Skalierung und Terraform Apply" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <div className="fixed inset-0 grid-pattern opacity-50 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-500/4 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 border-b border-zinc-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-zinc-100">DevRoadmap</span>
            <Badge variant="blue" className="text-[10px]">BETA</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">Loslegen →</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge variant="violet" className="mb-6 px-4 py-1.5 text-xs">
            <Star className="w-3 h-3 mr-1.5" />
            Interaktive Karriere-Roadmap für Entwickler
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="gradient-text">Vom Web-Entwickler</span>
            <br />
            <span className="text-zinc-300">zum</span>{" "}
            <span className="gradient-text-blue">Cloud-Native</span>
            <br />
            <span className="gradient-text-emerald">KI-Ingenieur</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Vollständige interaktive Roadmap mit 11 technischen Sektionen, XP-System,
            Portfolio-Projekten und Karriere-Dashboard. Bau dir die Skills auf, die dich weiterbringen.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" asChild className="text-base px-8">
              <Link href="/dashboard">Jetzt starten <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8">
              <Link href="/dashboard/roadmap">Roadmap ansehen</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: "Roadmap-Sektionen", value: "11" },
            { label: "Portfolio-Projekte", value: "5" },
            { label: "Technologien", value: "40+" },
            { label: "Lernstunden gesamt", value: "350+" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold gradient-text-blue">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Career path */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Dein Karrierepfad</h2>
          <p className="text-zinc-500">Realistische Zeitlinie vom Fullstack-Dev zum Platform Engineer</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {careerSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative glass rounded-xl p-5 text-center glass-hover cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center ${step.bgClass}`}>
                  <Icon className={`w-5 h-5 ${step.colorClass}`} />
                </div>
                <div className="font-semibold text-zinc-200 text-sm mb-1">{step.role}</div>
                <div className="text-[10px] text-zinc-500">{step.desc}</div>
                {i < careerSteps.length - 1 && (
                  <ChevronRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 hidden md:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">11 Technische Sektionen</h2>
          <p className="text-zinc-500">Vollständiger Pfad vom Grundlagenwissen bis Expertenniveau</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {techStack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-4 text-center glass-hover cursor-default group"
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${tech.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs text-zinc-400">{tech.name}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Alles was du brauchst</h2>
          <p className="text-zinc-500">Premium-Dashboard für dein selbstständiges Lernen</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 glass-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-zinc-100 mb-2">{feat.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="glass rounded-2xl p-12 max-w-3xl mx-auto border border-zinc-700/50">
            <h2 className="text-3xl font-bold mb-4">Bereit für den nächsten Schritt?</h2>
            <p className="text-zinc-400 mb-8">
              Starte die Roadmap und lerne DevOps, Cloud und KI-Engineering systematisch.
              Jeder abgeschlossene Node ist eine echte Fähigkeit — jedes XP ein Schritt vorwärts.
            </p>
            <Button size="lg" asChild className="text-base px-10">
              <Link href="/dashboard">
                Kostenlos starten
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-zinc-800/50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>DevRoadmap 2026 — Dein Weg zum Cloud-Native KI-Ingenieur</span>
          </div>
          <span>Next.js + PostgreSQL + Redis</span>
        </div>
      </footer>
    </div>
  );
}
