"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch, Box, Network, Layers, Brain,
  Clock, ChevronDown, CheckCircle2, Circle, Code2,
  ExternalLink, Cpu, TrendingUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/lib/store/progress";
import { projects } from "@/lib/data/projects";
import { cn, getDifficultyColor, getDifficultyLabel } from "@/lib/utils";

const projectIcons: Record<string, React.ElementType> = {
  "cicd-pipeline": GitBranch,
  "dockerized-fullstack": Box,
  "kubernetes-cluster": Network,
  "terraform-aws": Layers,
  "ai-rag-platform": Brain,
};

const projectColors: Record<string, string> = {
  "cicd-pipeline": "violet",
  "dockerized-fullstack": "blue",
  "kubernetes-cluster": "cyan",
  "terraform-aws": "purple",
  "ai-rag-platform": "pink",
};

const colorClasses: Record<string, { text: string; bg: string; border: string }> = {
  violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  pink: { text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
};

export default function ProjektePage() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { projectProgress, setProjectStatus, toggleProjectChecklist } = useProgressStore();

  const totalCompleted = projects.filter(
    (p) => projectProgress[p.id]?.status === "completed"
  ).length;

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="emerald">{totalCompleted}/{projects.length} abgeschlossen</Badge>
          </div>
          <p className="text-xs text-zinc-500 mt-1">5 Portfolio-Projekte für den produktiven Einsatz</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500">Fortschritt</div>
          <Progress value={(totalCompleted / projects.length) * 100} className="w-24 h-1.5 mt-1" />
        </div>
      </div>

      <div className="space-y-3">
        {projects.map((project, i) => {
          const colorKey = projectColors[project.id] || "blue";
          const color = colorClasses[colorKey];
          const Icon = projectIcons[project.id] || Code2;
          const progress = projectProgress[project.id];
          const status = progress?.status || "not_started";
          const checklist = progress?.checklistState || {};
          const checklistPct = Math.round(
            (project.deploymentChecklist.filter((c) => checklist[c.id]).length /
              project.deploymentChecklist.length) * 100
          );
          const isExpanded = expandedProject === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className={cn("overflow-hidden", isExpanded && "border-zinc-700")}>
                <button
                  onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-zinc-800/30 transition-colors"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color.bg}`}>
                    <Icon className={`w-5.5 h-5.5 ${color.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-zinc-100">{project.title}</span>
                      <Badge className={cn("text-[9px]", getDifficultyColor(project.difficulty))}>
                        {getDifficultyLabel(project.difficulty)}
                      </Badge>
                      {status === "completed" && <Badge variant="emerald" className="text-[9px]">✓ Fertig</Badge>}
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:block text-right">
                      <div className="text-xs text-zinc-400">{checklistPct}%</div>
                      <Progress value={checklistPct} className="w-16 h-1 mt-1" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-zinc-600">
                      <Clock className="w-3 h-3" />
                      {project.estimatedHours}h
                    </div>
                    <Badge variant="default" className="text-[9px]">+{project.xpReward} XP</Badge>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-zinc-600" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-zinc-800 p-4 bg-zinc-900/20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Architektur</h4>
                              <div className="text-xs text-zinc-400 leading-relaxed p-3 bg-zinc-900 rounded-lg border border-zinc-800 terminal-text">
                                {project.architecture}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Technologien</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies.map((tech) => (
                                  <Badge key={tech} variant="default" className="text-[10px]">{tech}</Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Projektstatus</h4>
                              <div className="flex gap-2">
                                {(["not_started", "in_progress", "completed"] as const).map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => setProjectStatus(project.id, s)}
                                    className={cn(
                                      "flex-1 py-1.5 px-2 rounded-lg text-[10px] font-medium transition-all border",
                                      status === s
                                        ? s === "completed"
                                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                          : s === "in_progress"
                                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                          : "bg-zinc-700 text-zinc-300 border-zinc-600"
                                        : "bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-700"
                                    )}
                                  >
                                    {s === "not_started" ? "Nicht begonnen" : s === "in_progress" ? "In Bearbeitung" : "Abgeschlossen"}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                Deployment-Checkliste
                              </h4>
                              <span className="text-xs text-zinc-500">
                                {project.deploymentChecklist.filter((c) => checklist[c.id]).length}/{project.deploymentChecklist.length}
                              </span>
                            </div>
                            <Progress value={checklistPct} className="h-1 mb-3" indicatorClassName="bg-gradient-to-r from-emerald-500 to-teal-500" />
                            <div className="space-y-1.5 max-h-64 overflow-y-auto">
                              {project.deploymentChecklist.map((item) => (
                                <motion.button
                                  key={item.id}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleProjectChecklist(project.id, item.id)}
                                  className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors text-left group"
                                >
                                  {checklist[item.id] ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5 group-hover:text-zinc-500" />
                                  )}
                                  <span className={cn(
                                    "text-xs leading-relaxed",
                                    checklist[item.id] ? "line-through text-zinc-600" : "text-zinc-400"
                                  )}>
                                    {item.label}
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
