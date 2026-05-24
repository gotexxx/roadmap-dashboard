"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Box, GitBranch, Cloud, Layers, Network, Activity,
  Cpu, Brain, Zap, LayoutDashboard, ChevronDown, ChevronRight,
  Clock, TrendingUp, BookOpen, Code2, CheckCircle2, Circle,
  PlayCircle, ExternalLink, Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { roadmapSections, type RoadmapNode, type RoadmapSection } from "@/lib/data/roadmap";
import { useProgressStore } from "@/lib/store/progress";
import { cn, getDifficultyColor, getDifficultyLabel, getStatusLabel, getStatusColor } from "@/lib/utils";

const sectionIcons: Record<string, React.ElementType> = {
  "linux-bash": Terminal, docker: Box, cicd: GitBranch, aws: Cloud,
  terraform: Layers, kubernetes: Network, monitoring: Activity,
  "ai-infra": Cpu, rag: Brain, "ai-apis": Zap, "system-design": LayoutDashboard,
};

const sectionColors: Record<string, string> = {
  "linux-bash": "emerald", docker: "blue", cicd: "violet", aws: "orange",
  terraform: "purple", kubernetes: "cyan", monitoring: "yellow",
  "ai-infra": "pink", rag: "rose", "ai-apis": "amber", "system-design": "slate",
};

const colorMap: Record<string, { badge: string; text: string; bg: string; border: string }> = {
  emerald: { badge: "emerald", text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  blue: { badge: "blue", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  violet: { badge: "violet", text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  orange: { badge: "orange", text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  purple: { badge: "violet", text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  cyan: { badge: "cyan", text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  yellow: { badge: "yellow", text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  pink: { badge: "pink", text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  rose: { badge: "pink", text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  amber: { badge: "amber", text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  slate: { badge: "default", text: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20" },
};

export default function RoadmapPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>("linux-bash");
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const { nodeProgress, setNodeStatus } = useProgressStore();

  const totalNodes = roadmapSections.flatMap((s) => s.nodes).length;
  const completedNodes = Object.values(nodeProgress).filter((n) => n.status === "completed").length;

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">{completedNodes}/{totalNodes} abgeschlossen</Badge>
            <Badge variant="default">{Math.round((completedNodes / totalNodes) * 100)}% der Roadmap</Badge>
          </div>
          <p className="text-xs text-zinc-500">Sektion anklicken zum Ausklappen · Node anklicken für Details</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500">Gesamtfortschritt</div>
          <Progress
            value={(completedNodes / totalNodes) * 100}
            className="w-32 h-1.5 mt-1"
          />
        </div>
      </div>

      <div className="space-y-3">
        {roadmapSections.map((section, sIdx) => {
          const colorKey = sectionColors[section.id] || "blue";
          const color = colorMap[colorKey];
          const Icon = sectionIcons[section.id] || Box;
          const isOpen = expandedSection === section.id;
          const sectionCompleted = section.nodes.filter((n) => nodeProgress[n.id]?.status === "completed").length;
          const sectionPct = Math.round((sectionCompleted / section.nodes.length) * 100);

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.04 }}
            >
              <Card className={cn(
                "overflow-hidden transition-all",
                isOpen ? `border-zinc-700` : "hover:border-zinc-700"
              )}>
                <button
                  onClick={() => setExpandedSection(isOpen ? null : section.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-zinc-800/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color.bg}`}>
                    <Icon className={`w-5 h-5 ${color.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-zinc-100">{section.title}</span>
                      {sectionCompleted === section.nodes.length && (
                        <Badge variant="emerald" className="text-[9px]">✓ Abgeschlossen</Badge>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5 truncate">{section.description}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden sm:block text-right">
                      <div className="text-xs text-zinc-400">{sectionCompleted}/{section.nodes.length}</div>
                      <Progress value={sectionPct} className="w-20 h-1 mt-1" />
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-zinc-800 divide-y divide-zinc-800/50">
                        {section.nodes.map((node) => (
                          <NodeRow
                            key={node.id}
                            node={node}
                            color={color}
                            isExpanded={expandedNode === node.id}
                            onToggle={() => setExpandedNode(expandedNode === node.id ? null : node.id)}
                            status={nodeProgress[node.id]?.status || "not_started"}
                            onStatusChange={(s) => setNodeStatus(node.id, s)}
                          />
                        ))}
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

function NodeRow({
  node, color, isExpanded, onToggle, status, onStatusChange
}: {
  node: RoadmapNode;
  color: { badge: string; text: string; bg: string; border: string };
  isExpanded: boolean;
  onToggle: () => void;
  status: "not_started" | "in_progress" | "completed";
  onStatusChange: (s: "not_started" | "in_progress" | "completed") => void;
}) {
  const statusIcon = {
    completed: <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
    in_progress: <PlayCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />,
    not_started: <Circle className="w-4 h-4 text-zinc-600 flex-shrink-0" />,
  }[status];

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800/20 transition-colors group"
      >
        {statusIcon}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-zinc-200 group-hover:text-zinc-100">{node.title}</span>
            <Badge className={cn("text-[9px]", getDifficultyColor(node.difficulty))}>
              {getDifficultyLabel(node.difficulty)}
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 truncate mt-0.5">{node.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1 text-xs text-zinc-600">
            <Clock className="w-3 h-3" />
            {node.estimatedHours}h
          </div>
          <Badge variant="default" className="text-[9px]">+{node.xpReward} XP</Badge>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800/50 bg-zinc-900/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Beschreibung</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{node.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Details</h4>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-zinc-500">Lernzeit:</span>
                        <span className="text-zinc-300">{node.estimatedHours} Stunden</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Star className="w-3.5 h-3.5 text-yellow-500" />
                        <span className="text-zinc-500">Branchennutzung:</span>
                        <span className="text-zinc-300">{node.realWorldUsage}</span>
                      </div>
                    </div>
                  </div>

                  {node.prerequisites.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Voraussetzungen</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {node.prerequisites.map((p) => (
                          <Badge key={p} variant="default" className="text-[10px]">{p}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 inline mr-1" />
                      Ressourcen
                    </h4>
                    <div className="space-y-1.5">
                      {node.resources.map((r) => (
                        <a
                          key={r.title}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 p-1.5 rounded-md hover:bg-zinc-800 transition-colors group"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span className="flex-1 truncate">{r.title}</span>
                          <Badge variant="default" className="text-[9px]">{r.type}</Badge>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                      <Code2 className="w-3.5 h-3.5 inline mr-1" />
                      Projekte
                    </h4>
                    <div className="space-y-1">
                      {node.projects.map((p) => (
                        <div key={p} className="flex items-start gap-2 text-xs text-zinc-400">
                          <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-zinc-600" />
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">Status</h4>
                    <div className="flex gap-1.5">
                      {(["not_started", "in_progress", "completed"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => onStatusChange(s)}
                          className={cn(
                            "flex-1 py-1.5 px-2 rounded-md text-[10px] font-medium transition-all border",
                            status === s
                              ? s === "completed"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : s === "in_progress"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : "bg-zinc-700 text-zinc-300 border-zinc-600"
                              : "bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-700 hover:text-zinc-500"
                          )}
                        >
                          {getStatusLabel(s)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
