"use client";
import { motion } from "framer-motion";
import { Target, CheckCircle2, XCircle, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useProgressStore } from "@/lib/store/progress";
import { roadmapSections } from "@/lib/data/roadmap";
import { xpToLevel } from "@/lib/utils";

const careerPaths = [
  {
    title: "Junior DevOps Engineer",
    timeframe: "3–6 Monate",
    requiredSections: ["linux-bash", "docker", "cicd"],
    color: "blue",
    icon: "🚀",
    desc: "Einstieg in CI/CD, Containerisierung und Cloud-Infrastruktur",
  },
  {
    title: "Cloud Engineer",
    timeframe: "6–12 Monate",
    requiredSections: ["aws", "terraform", "docker"],
    color: "violet",
    icon: "☁️",
    desc: "AWS-Infrastruktur, Infrastructure as Code, Cloud-Architektur",
  },
  {
    title: "KI-Ingenieur",
    timeframe: "12–18 Monate",
    requiredSections: ["rag", "ai-apis", "ai-infra"],
    color: "emerald",
    icon: "🤖",
    desc: "RAG-Systeme, LLM-APIs, KI-Deployment und Infrastruktur",
  },
  {
    title: "Platform Engineer",
    timeframe: "15–20 Monate",
    requiredSections: ["kubernetes", "terraform", "monitoring", "cicd"],
    color: "orange",
    icon: "⚙️",
    desc: "Kubernetes-Cluster, GitOps, Observability, Developer-Plattformen",
  },
  {
    title: "Cloud-Native KI-Ingenieur",
    timeframe: "18–24 Monate",
    requiredSections: ["kubernetes", "cicd", "ai-infra", "rag", "monitoring"],
    color: "pink",
    icon: "✨",
    desc: "Vollständige Kombination: DevOps + Cloud + KI — das Ziel dieser Roadmap",
  },
];

const skillGaps = [
  { skill: "Linux & Bash", current: 60, required: 80 },
  { skill: "Docker", current: 75, required: 90 },
  { skill: "Kubernetes", current: 20, required: 85 },
  { skill: "AWS Cloud", current: 40, required: 75 },
  { skill: "Terraform", current: 15, required: 70 },
  { skill: "CI/CD", current: 55, required: 80 },
  { skill: "Monitoring", current: 25, required: 65 },
  { skill: "KI/ML", current: 10, required: 60 },
];

const colorText: Record<string, string> = {
  blue: "text-blue-400", violet: "text-violet-400", emerald: "text-emerald-400",
  orange: "text-orange-400", pink: "text-pink-400",
};

export default function KarrierePage() {
  const { nodeProgress, stats } = useProgressStore();
  const level = xpToLevel(stats.xp);

  const completedSections = new Set(
    roadmapSections
      .filter((s) => s.nodes.every((n) => nodeProgress[n.id]?.status === "completed"))
      .map((s) => s.id)
  );

  const getReadiness = (requiredSections: string[]) => {
    const done = requiredSections.filter((s) => completedSections.has(s)).length;
    return Math.round((done / requiredSections.length) * 100);
  };

  const totalNodes = roadmapSections.flatMap((s) => s.nodes).length;
  const completedNodes = Object.values(nodeProgress).filter((n) => n.status === "completed").length;
  const overallReadiness = Math.round((completedNodes / totalNodes) * 100);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Aktuelles Level", value: `Level ${level}`, sub: `${stats.xp.toLocaleString("de-DE")} XP insgesamt`, badge: `${stats.streak} Tage Serie`, badgeVariant: "blue" as const },
          { label: "Roadmap-Fortschritt", value: `${overallReadiness}%`, sub: `${completedNodes} von ${totalNodes} Nodes`, badge: null, badgeVariant: "emerald" as const },
          { label: "Ziel", value: "Cloud-Native", value2: "KI-Ingenieur", sub: "", badge: "in 18–24 Monaten", badgeVariant: "violet" as const },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-5">
                <div className="text-xs text-zinc-500 mb-1">{card.label}</div>
                <div className="text-3xl font-bold gradient-text-blue">{card.value}</div>
                {"value2" in card && <div className="text-3xl font-bold gradient-text-blue">{card.value2}</div>}
                {card.sub && <div className="text-xs text-zinc-500 mt-0.5">{card.sub}</div>}
                {i === 1 && <Progress value={overallReadiness} className="h-1 mt-3" />}
                {card.badge && <Badge variant={card.badgeVariant} className="mt-2 text-[10px]">{card.badge}</Badge>}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-violet-400" />
          Karrierepfade & Bereitschaft
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {careerPaths.map((path, i) => {
            const readiness = getReadiness(path.requiredSections);
            return (
              <motion.div key={path.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={readiness === 100 ? "border-emerald-500/30" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-lg mb-1">{path.icon}</div>
                        <h4 className="text-sm font-semibold text-zinc-200">{path.title}</h4>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{path.timeframe}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${colorText[path.color] || "text-zinc-400"}`}>{readiness}%</div>
                        <div className="text-[10px] text-zinc-600">Bereit</div>
                      </div>
                    </div>
                    <Progress value={readiness} className="h-1.5 mb-2" />
                    <p className="text-[10px] text-zinc-500 mb-2">{path.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {path.requiredSections.map((s) => (
                        <div key={s} className="flex items-center gap-1">
                          {completedSections.has(s)
                            ? <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            : <XCircle className="w-3 h-3 text-zinc-700" />}
                          <span className={`text-[10px] ${completedSections.has(s) ? "text-zinc-400" : "text-zinc-600"}`}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-400" />
            Kompetenzlücken
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {skillGaps.map((gap, i) => (
              <motion.div key={gap.skill} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex items-center gap-4">
                <div className="w-28 text-xs text-zinc-400 flex-shrink-0">{gap.skill}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-600">
                    <span>Aktuell: {gap.current}%</span>
                    <span>Ziel: {gap.required}%</span>
                  </div>
                  <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${gap.required}%` }} transition={{ delay: i * 0.04 + 0.2, duration: 0.6 }} className="absolute h-full bg-zinc-700 rounded-full" />
                    <motion.div initial={{ width: 0 }} animate={{ width: `${gap.current}%` }} transition={{ delay: i * 0.04 + 0.3, duration: 0.6 }} className="absolute h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                  </div>
                </div>
                <div className="w-12 text-right">
                  <Badge variant={gap.current >= gap.required ? "emerald" : "default"} className="text-[9px]">
                    {gap.current >= gap.required ? "✓" : `-${gap.required - gap.current}%`}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
