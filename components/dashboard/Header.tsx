"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Zap, Flame, Clock } from "lucide-react";
import { useProgressStore } from "@/lib/store/progress";
import { Button } from "@/components/ui/button";
import { xpToLevel } from "@/lib/utils";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Übersicht", subtitle: "Dein Lern-Dashboard" },
  "/dashboard/roadmap": { title: "Roadmap", subtitle: "11 technische Sektionen" },
  "/dashboard/karriere": { title: "Karriere", subtitle: "Karrierepfad & Bereitschaft" },
  "/dashboard/projekte": { title: "Projekte", subtitle: "Portfolio & Checklisten" },
  "/dashboard/lernen": { title: "Lernen", subtitle: "Tagesaufgaben & Wochenziele" },
  "/dashboard/devops": { title: "DevOps Dashboard", subtitle: "Metriken & Monitoring" },
  "/dashboard/ki": { title: "KI-Ingenieur", subtitle: "RAG, LLM & KI-Infrastruktur" },
  "/dashboard/lab": { title: "Cloud Lab", subtitle: "Deployment-Simulator" },
};

export function Header() {
  const pathname = usePathname();
  const { stats, setCommandPaletteOpen } = useProgressStore();
  const page = pageTitles[pathname] || { title: "DevRoadmap", subtitle: "" };
  const level = xpToLevel(stats.xp);

  return (
    <header className="h-14 border-b border-zinc-800/60 flex items-center justify-between px-6 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-30">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-sm font-semibold text-zinc-100">{page.title}</h1>
        {page.subtitle && <p className="text-xs text-zinc-500">{page.subtitle}</p>}
      </motion.div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs hover:border-zinc-700 hover:text-zinc-400 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Suchen...</span>
          <kbd className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 border border-zinc-700">⌘K</kbd>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-medium text-zinc-300">{stats.streak}d</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs font-medium text-zinc-300">{stats.xp.toLocaleString()} XP</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
          {level}
        </div>
      </div>
    </header>
  );
}
