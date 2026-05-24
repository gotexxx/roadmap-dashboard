"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Terminal,
  LayoutDashboard,
  Map,
  Briefcase,
  FolderGit2,
  BookOpen,
  Activity,
  Brain,
  FlaskConical,
  Search,
  Settings,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/lib/store/progress";
import { Progress } from "@/components/ui/progress";
import { xpToLevel, xpProgressToNextLevel, levelToXp } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Übersicht",
    exact: true,
  },
  { href: "/dashboard/roadmap", icon: Map, label: "Roadmap" },
  { href: "/dashboard/karriere", icon: Briefcase, label: "Karriere" },
  { href: "/dashboard/projekte", icon: FolderGit2, label: "Projekte" },
  { href: "/dashboard/lernen", icon: BookOpen, label: "Lernen" },
  { href: "/dashboard/devops", icon: Activity, label: "DevOps" },
  { href: "/dashboard/ki", icon: Brain, label: "KI-Ingenieur" },
  { href: "/dashboard/lab", icon: FlaskConical, label: "Cloud Lab" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { stats, setCommandPaletteOpen } = useProgressStore();
  const level = xpToLevel(stats.xp);
  const progress = xpProgressToNextLevel(stats.xp);
  const currentLevelXp = levelToXp(level);
  const nextLevelXp = levelToXp(level + 1);
  const [dBStatus, setDbStatus] = useState<"active" | "inactive">("inactive");
  const [redisStatus, setRedisStatus] = useState<"active" | "inactive">(
    "inactive",
  );

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setDbStatus(data.db ? "active" : "inactive");
        setRedisStatus(data.redis ? "active" : "inactive");
      })
      .catch(() => {
        setDbStatus("inactive");
        setRedisStatus("inactive");
      });
  }, [pathname]); // Check DB health on route change to update status indicator
  return (
    <TooltipProvider delayDuration={300}>
      <aside className="fixed left-0 top-0 h-full w-56 border-r border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl z-40 flex flex-col">
        <div className="h-14 border-b border-zinc-800/60 flex items-center px-4 gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Terminal className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-100 leading-none">
              DevRoadmap
            </div>
            <div className="text-[10px] text-zinc-500 mt-0.5">
              Cloud · DevOps · KI
            </div>
          </div>
        </div>

        <div className="flex p-2 items-center gap-2 text-xs text-zinc-500">
          <span>Status:</span>
          <div
            className="h-2 w-2 rounded-full  "
            style={{
              backgroundColor: dBStatus === "active" ? "#00f410" : "#ff0000",
            }}
          />
          <div
            className="h-2 w-2 rounded-full  "
            style={{
              backgroundColor: redisStatus === "active" ? "#00f410" : "#ff0000",
            }}
          />
        </div>
        <div className="px-3 py-3">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs hover:border-zinc-700 hover:text-zinc-400 transition-colors group"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="flex-1 text-left">Suchen...</span>
            <kbd className="hidden group-hover:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 border border-zinc-700">
              ⌘K
            </kbd>
          </button>
        </div>

        <nav className="flex-1 px-2 py-1 overflow-y-auto">
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: 2 }}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors relative group",
                      isActive
                        ? "bg-zinc-800 text-zinc-100"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-500 rounded-full"
                      />
                    )}
                    <Icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0",
                        isActive ? "text-blue-400" : "",
                      )}
                    />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-3 h-3 ml-auto text-zinc-500" />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="mx-3 mb-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-medium text-zinc-300">
                Level {level}
              </span>
            </div>
            <span className="text-[10px] text-zinc-500">
              {stats.xp.toLocaleString("de-DE")} XP
            </span>
          </div>
          <Progress value={progress} className="h-1" />
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-zinc-600">
              {currentLevelXp} XP
            </span>
            <span className="text-[10px] text-zinc-600">{nextLevelXp} XP</span>
          </div>
        </div>
        <div className="border-t border-zinc-800/60 px-2 py-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Einstellungen</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">App-Einstellungen</TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
