"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Map, Briefcase, FolderGit2, BookOpen,
  Activity, Brain, FlaskConical, Terminal, Search
} from "lucide-react";
import { useProgressStore } from "@/lib/store/progress";

const commands = [
  { icon: LayoutDashboard, label: "Übersicht", href: "/dashboard", group: "Navigation" },
  { icon: Map, label: "Roadmap", href: "/dashboard/roadmap", group: "Navigation" },
  { icon: Briefcase, label: "Karriere", href: "/dashboard/karriere", group: "Navigation" },
  { icon: FolderGit2, label: "Projekte", href: "/dashboard/projekte", group: "Navigation" },
  { icon: BookOpen, label: "Lernen", href: "/dashboard/lernen", group: "Navigation" },
  { icon: Activity, label: "DevOps Dashboard", href: "/dashboard/devops", group: "Navigation" },
  { icon: Brain, label: "KI-Ingenieur", href: "/dashboard/ki", group: "Navigation" },
  { icon: FlaskConical, label: "Cloud Lab", href: "/dashboard/lab", group: "Navigation" },
];

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useProgressStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") setCommandPaletteOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const groups = [...new Set(commands.map((c) => c.group))];

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20vh] z-50 w-full max-w-lg -translate-x-1/2"
          >
            <Command
              className="rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl overflow-hidden"
              shouldFilter
            >
              <div className="flex items-center border-b border-zinc-800 px-4">
                <Search className="w-4 h-4 text-zinc-500 mr-3" />
                <Command.Input
                  placeholder="Seite oder Befehl suchen..."
                  className="flex-1 bg-transparent py-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded text-[10px] text-zinc-600 bg-zinc-900 border border-zinc-800">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-72 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-zinc-500">
                  Keine Ergebnisse
                </Command.Empty>

                {groups.map((group) => (
                  <Command.Group key={group} heading={group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-600 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
                    {commands
                      .filter((c) => c.group === group)
                      .map((cmd) => {
                        const Icon = cmd.icon;
                        return (
                          <Command.Item
                            key={cmd.href}
                            value={cmd.label}
                            onSelect={() => {
                              router.push(cmd.href);
                              setCommandPaletteOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 cursor-pointer data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-100 transition-colors"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            {cmd.label}
                          </Command.Item>
                        );
                      })}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="border-t border-zinc-800 px-4 py-2 flex items-center gap-4 text-[10px] text-zinc-600">
                <div className="flex items-center gap-1"><Terminal className="w-3 h-3" /> DevRoadmap</div>
                <div className="ml-auto flex items-center gap-3">
                  <span className="flex items-center gap-1"><kbd className="bg-zinc-900 border border-zinc-700 px-1 rounded">↑↓</kbd> Navigation</span>
                  <span className="flex items-center gap-1"><kbd className="bg-zinc-900 border border-zinc-700 px-1 rounded">↵</kbd> auswählen</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
