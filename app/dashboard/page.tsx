"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Flame,
  CheckCircle2,
  Circle,
  ArrowRight,
  Map,
  Briefcase,
  FolderGit2,
  Activity,
  Star,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/lib/store/progress";
import { roadmapSections } from "@/lib/data/roadmap";
import { xpToLevel, xpProgressToNextLevel, levelToXp } from "@/lib/utils";
import { XpHistoryChart } from "@/components/ui/xp-history-chart";

export default function DashboardPage() {
  const { stats, nodeProgress, projectProgress, achievements, dailyTasks } =
    useProgressStore();
  const level = xpToLevel(stats.xp);
  const xpProgress = xpProgressToNextLevel(stats.xp);
  const currentLevelXp = levelToXp(level);
  const nextLevelXp = levelToXp(level + 1);

  const totalNodes = roadmapSections.flatMap((s) => s.nodes).length;
  const completedNodes = Object.values(nodeProgress).filter(
    (n) => n.status === "completed",
  ).length;
  const roadmapPercent = Math.round((completedNodes / totalNodes) * 100);

  const totalProjects = 5;
  const completedProjects = Object.values(projectProgress).filter(
    (p) => p.status === "completed",
  ).length;

  const dailyCompleted = dailyTasks.filter((t) => t.completed).length;
  const dailyTotal = dailyTasks.length;

  const recentSections = roadmapSections.slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold text-zinc-100">
          Hallo! Zeit zum Lernen 👋
        </h2>
        <p className="text-sm text-zinc-500 mt-0.5">
          Level {level} · {stats.streak} Tage in Folge ·{" "}
          {stats.totalHoursStudied} Stunden insgesamt
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Zap,
            label: "XP",
            value: stats.xp.toLocaleString("de-DE"),
            sub: `Level ${level}`,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
          },
          {
            icon: Flame,
            label: "Serie",
            value: `${stats.streak} Tage`,
            sub: "in Folge",
            color: "text-orange-400",
            bg: "bg-orange-500/10",
          },
          {
            icon: CheckCircle2,
            label: "Abgeschlossen",
            value: `${completedNodes}/${totalNodes}`,
            sub: "Roadmap-Nodes",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            icon: Star,
            label: "Abzeichen",
            value: achievements.length.toString(),
            sub: "Errungenschaften",
            color: "text-violet-400",
            bg: "bg-violet-500/10",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-zinc-100">
                        {stat.value}
                      </p>
                      <p className="text-xs text-zinc-600 mt-0.5">{stat.sub}</p>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* XP Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            XP-Fortschritt — Level {level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500">Level {level}</span>
            <span className="text-xs text-zinc-400">
              {Math.round(xpProgress)}%
            </span>
            <span className="text-xs text-zinc-500">Level {level + 1}</span>
          </div>
          <Progress
            value={xpProgress}
            className="h-2.5"
            indicatorClassName="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500"
          />
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-zinc-600">
              {currentLevelXp} XP
            </span>
            <span className="text-[10px] text-zinc-500">
              {stats.xp} / {nextLevelXp} XP
            </span>
            <span className="text-[10px] text-zinc-600">{nextLevelXp} XP</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-zinc-900">
              <div className="text-lg font-bold text-blue-400">
                {roadmapPercent}%
              </div>
              <div className="text-[10px] text-zinc-500">Roadmap</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-zinc-900">
              <div className="text-lg font-bold text-emerald-400">
                {completedProjects}/{totalProjects}
              </div>
              <div className="text-[10px] text-zinc-500">Projekte</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-zinc-900">
              <div className="text-lg font-bold text-orange-400">
                {dailyCompleted}/{dailyTotal}
              </div>
              <div className="text-[10px] text-zinc-500">Heute</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <XpHistoryChart />

      {/* Daily Tasks */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              Aufgaben für heute
            </CardTitle>
            <Badge variant="blue">
              {dailyCompleted}/{dailyTotal}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dailyTasks.map((task) => (
              <DailyTaskRow key={task.id} task={task} />
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-3 w-full" asChild>
            <Link href="/dashboard/lernen">
              Alle Aufgaben <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Roadmap sections */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-zinc-300">
            Roadmap-Sektionen
          </h3>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/roadmap">
              Gesamte Roadmap <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentSections.map((section, i) => {
            const sectionCompleted = section.nodes.filter(
              (n) => nodeProgress[n.id]?.status === "completed",
            ).length;
            const sectionPct = Math.round(
              (sectionCompleted / section.nodes.length) * 100,
            );
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href="/dashboard/roadmap">
                  <Card className="hover:border-zinc-700 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-zinc-200">
                          {section.title}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {sectionCompleted}/{section.nodes.length}
                        </span>
                      </div>
                      <Progress value={sectionPct} className="h-1" />
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-zinc-600">
                          {sectionPct}% abgeschlossen
                        </span>
                        {sectionCompleted === section.nodes.length && (
                          <Badge variant="emerald" className="text-[9px]">
                            ✓ Fertig
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            icon: Map,
            label: "Roadmap",
            href: "/dashboard/roadmap",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            icon: Briefcase,
            label: "Karriere",
            href: "/dashboard/karriere",
            color: "text-violet-400",
            bg: "bg-violet-500/10",
          },
          {
            icon: FolderGit2,
            label: "Projekte",
            href: "/dashboard/projekte",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            icon: Activity,
            label: "DevOps",
            href: "/dashboard/devops",
            color: "text-orange-400",
            bg: "bg-orange-500/10",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card className="hover:border-zinc-700 transition-colors cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    {item.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500 ml-auto transition-colors" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function DailyTaskRow({
  task,
}: {
  task: { id: string; title: string; xpReward: number; completed: boolean };
}) {
  const { toggleDailyTask } = useProgressStore();
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      onClick={() => toggleDailyTask(task.id)}
      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer group"
    >
      {task.completed ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
      ) : (
        <Circle className="w-4 h-4 text-zinc-600 flex-shrink-0 group-hover:text-zinc-500" />
      )}
      <span
        className={`text-sm flex-1 ${task.completed ? "line-through text-zinc-600" : "text-zinc-300"}`}
      >
        {task.title}
      </span>
      <Badge
        variant={task.completed ? "emerald" : "default"}
        className="text-[10px]"
      >
        +{task.xpReward} XP
      </Badge>
    </motion.div>
  );
}
