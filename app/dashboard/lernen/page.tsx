"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, Circle, Flame, Target, BookOpen, Clock,
  Calendar, Star, Zap, TrendingUp, Trophy
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

const weeklyGoals = [
  { id: "wg1", title: "2 Roadmap-Sektionen abschließen", progress: 1, total: 2, xp: 300 },
  { id: "wg2", title: "1 Portfolio-Projekt erstellen", progress: 0, total: 1, xp: 500 },
  { id: "wg3", title: "3 technische Artikel lesen", progress: 1, total: 3, xp: 150 },
  { id: "wg4", title: "Bash-Skript oder Dockerfile schreiben", progress: 1, total: 1, xp: 200 },
];

const learningTimeline = [
  { week: 1, focus: "Linux & Bash Fundamentals", status: "completed", hours: 15 },
  { week: 2, focus: "Docker Basics + Dockerfile", status: "completed", hours: 12 },
  { week: 3, focus: "Docker Compose + Best Practices", status: "in_progress", hours: 10 },
  { week: 4, focus: "Git Advanced + GitHub Actions", status: "pending", hours: 14 },
  { week: 5, focus: "AWS Fundamentals (Free Tier)", status: "pending", hours: 20 },
  { week: 6, focus: "AWS ECS + ECR", status: "pending", hours: 16 },
  { week: 7, focus: "Terraform Basics", status: "pending", hours: 18 },
  { week: 8, focus: "Kubernetes Basics (kind/minikube)", status: "pending", hours: 22 },
];

const achievementsList = [
  { id: "first_node", icon: "🎯", title: "Erster Schritt", desc: "Schließe deinen ersten Node ab", xp: 250, unlocked: false },
  { id: "linux_master", icon: "🐧", title: "Linux Master", desc: "Schließe die gesamte Linux & Bash Sektion ab", xp: 500, unlocked: false },
  { id: "docker_captain", icon: "🐋", title: "Docker Captain", desc: "Schließe die gesamte Docker Sektion ab", xp: 500, unlocked: false },
  { id: "streak_7", icon: "🔥", title: "Woche in Folge", desc: "7 Tage Lernen in Folge", xp: 350, unlocked: false },
  { id: "first_project", icon: "🚀", title: "Launcher", desc: "Schließe das erste Portfolio-Projekt ab", xp: 750, unlocked: false },
  { id: "xp_1000", icon: "⚡", title: "Power User", desc: "Erreiche 1000 XP", xp: 200, unlocked: true },
];

export default function LernenPage() {
  const { stats, dailyTasks, toggleDailyTask, achievements, unlockAchievement } = useProgressStore();
  const [focusMode, setFocusMode] = useState(false);

  const dailyCompleted = dailyTasks.filter((t) => t.completed).length;
  const dailyPct = Math.round((dailyCompleted / dailyTasks.length) * 100);

  return (
    <div className="space-y-6 max-w-5xl">
      {focusMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-sm font-medium text-blue-300">Fokusmodus aktiv</div>
              <div className="text-xs text-blue-400/70">Minimale Ablenkungen · Fortschritt verfolgen</div>
            </div>
          </div>
          <button onClick={() => setFocusMode(false)} className="text-xs text-blue-400 hover:text-blue-300">
            Deaktivieren
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Flame, label: "Serie", value: `${stats.streak} Tage`, color: "text-orange-400", bg: "bg-orange-500/10" },
          { icon: Zap, label: "XP heute", value: dailyTasks.filter((t) => t.completed).reduce((s, t) => s + t.xpReward, 0).toString(), color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { icon: Clock, label: "Stunden gesamt", value: stats.totalHoursStudied.toString(), color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: Trophy, label: "Abzeichen", value: achievements.length.toString(), color: "text-violet-400", bg: "bg-violet-500/10" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4.5 h-4.5 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">{stat.label}</div>
                    <div className="text-xl font-bold text-zinc-100">{stat.value}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                Aufgaben heute
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={dailyCompleted === dailyTasks.length ? "emerald" : "blue"}>
                  {dailyCompleted}/{dailyTasks.length}
                </Badge>
                <button
                  onClick={() => setFocusMode(true)}
                  className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Fokusmodus
                </button>
              </div>
            </div>
            <Progress value={dailyPct} className="h-1 mt-2" indicatorClassName="bg-gradient-to-r from-blue-500 to-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dailyTasks.map((task) => (
                <motion.button
                  key={task.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleDailyTask(task.id)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-900 transition-colors group text-left"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4.5 h-4.5 text-zinc-600 group-hover:text-zinc-500 flex-shrink-0" />
                  )}
                  <span className={cn("text-sm flex-1", task.completed ? "line-through text-zinc-600" : "text-zinc-300")}>
                    {task.title}
                  </span>
                  <Badge variant={task.completed ? "emerald" : "default"} className="text-[10px]">
                    +{task.xpReward} XP
                  </Badge>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-violet-400" />
              Wochenziele
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyGoals.map((goal, i) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-zinc-300">{goal.title}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-zinc-500">{goal.progress}/{goal.total}</span>
                      <Badge variant="violet" className="text-[9px]">+{goal.xp} XP</Badge>
                    </div>
                  </div>
                  <Progress
                    value={(goal.progress / goal.total) * 100}
                    className="h-1.5"
                    indicatorClassName={goal.progress >= goal.total ? "bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-purple-500"}
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Lernplan — 8 Wochen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {learningTimeline.map((week, i) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg",
                  week.status === "in_progress" ? "bg-blue-500/5 border border-blue-500/10" :
                  week.status === "completed" ? "bg-emerald-500/5" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                  week.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                  week.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                  "bg-zinc-800 text-zinc-500"
                )}>
                  {week.status === "completed" ? "✓" : week.week}
                </div>
                <div className="flex-1">
                  <span className={cn(
                    "text-sm font-medium",
                    week.status === "completed" ? "text-zinc-400 line-through" :
                    week.status === "in_progress" ? "text-zinc-100" : "text-zinc-500"
                  )}>
                    Woche {week.week}: {week.focus}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Clock className="w-3 h-3" />
                    {week.hours}h
                  </div>
                  {week.status === "in_progress" && (
                    <Badge variant="blue" className="text-[9px]">Aktiv</Badge>
                  )}
                  {week.status === "completed" && (
                    <Badge variant="emerald" className="text-[9px]">Fertig</Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            Abzeichen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {achievementsList.map((badge, i) => {
              const isUnlocked = achievements.includes(badge.id) || badge.unlocked;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "p-3 rounded-xl border",
                    isUnlocked
                      ? "bg-yellow-500/5 border-yellow-500/20"
                      : "bg-zinc-900/50 border-zinc-800 opacity-50 grayscale"
                  )}
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <div className={cn("text-sm font-semibold mb-0.5", isUnlocked ? "text-zinc-200" : "text-zinc-500")}>
                    {badge.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 mb-2">{badge.desc}</div>
                  <Badge variant={isUnlocked ? "yellow" : "default"} className="text-[9px]">
                    {isUnlocked ? "✓ Freigeschaltet" : `+${badge.xp} XP`}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
