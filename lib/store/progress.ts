"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NodeProgress {
  status: "not_started" | "in_progress" | "completed";
  completedAt?: string;
}

export interface ProjectProgress {
  status: "not_started" | "in_progress" | "completed";
  checklistState: Record<string, boolean>;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  totalHoursStudied: number;
  lastActivityAt: string;
}

export interface DailyTask {
  id: string;
  title: string;
  xpReward: number;
  completed: boolean;
}

interface ProgressStore {
  stats: UserStats;
  nodeProgress: Record<string, NodeProgress>;
  projectProgress: Record<string, ProjectProgress>;
  achievements: string[];
  dailyTasks: DailyTask[];
  commandPaletteOpen: boolean;
  dbLoaded: boolean;

  setNodeStatus: (nodeId: string, status: NodeProgress["status"]) => void;
  setProjectStatus: (projectId: string, status: ProjectProgress["status"]) => void;
  toggleProjectChecklist: (projectId: string, itemId: string) => void;
  addXp: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  toggleDailyTask: (taskId: string) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  loadFromDB: () => Promise<void>;
}

const LEVEL_XP_MULTIPLIER = 100;

function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / LEVEL_XP_MULTIPLIER)) + 1;
}

function apiPost(path: string, body: object) {
  fetch(`/api/progress/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {});
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      stats: {
        xp: 350,
        level: 2,
        streak: 3,
        totalHoursStudied: 24,
        lastActivityAt: new Date().toISOString(),
      },
      nodeProgress: {},
      projectProgress: {},
      achievements: [],
      dailyTasks: [
        { id: "dt1", title: "Docker-Dokumentation lesen (30 Min.)", xpReward: 50, completed: false },
        { id: "dt2", title: "Container mit Nginx starten", xpReward: 75, completed: false },
        { id: "dt3", title: "Dockerfile für eine Node.js-App schreiben", xpReward: 100, completed: false },
        { id: "dt4", title: "Linux-Netzwerkgrundlagen wiederholen", xpReward: 50, completed: false },
      ],
      commandPaletteOpen: false,
      dbLoaded: false,

      setNodeStatus: (nodeId, status) => {
        const prev = get().nodeProgress[nodeId];
        set((state) => ({
          nodeProgress: {
            ...state.nodeProgress,
            [nodeId]: {
              status,
              completedAt: status === "completed" ? new Date().toISOString() : prev?.completedAt,
            },
          },
        }));
        if (status === "completed" && prev?.status !== "completed") {
          get().addXp(100);
        }
        apiPost("node", { nodeId, status });
      },

      setProjectStatus: (projectId, status) => {
        set((state) => {
          const existing = state.projectProgress[projectId];
          const checklistState = existing?.checklistState || {};
          apiPost("project", { projectId, status, checklistState });
          return {
            projectProgress: {
              ...state.projectProgress,
              [projectId]: { ...existing, status, checklistState },
            },
          };
        });
      },

      toggleProjectChecklist: (projectId, itemId) => {
        set((state) => {
          const proj = state.projectProgress[projectId] || {
            status: "in_progress" as const,
            checklistState: {},
          };
          const newChecklistState = { ...proj.checklistState, [itemId]: !proj.checklistState[itemId] };
          const updated = { ...proj, checklistState: newChecklistState };
          apiPost("project", { projectId, status: updated.status, checklistState: newChecklistState });
          return {
            projectProgress: { ...state.projectProgress, [projectId]: updated },
          };
        });
      },

      addXp: (amount) => {
        set((state) => {
          const newXp = state.stats.xp + amount;
          const newLevel = calculateLevel(newXp);
          const newStats = {
            ...state.stats,
            xp: newXp,
            level: newLevel,
            lastActivityAt: new Date().toISOString(),
          };
          apiPost("stats", {
            xp: newStats.xp,
            level: newStats.level,
            streak: newStats.streak,
            totalHoursStudied: newStats.totalHoursStudied,
          });
          return { stats: newStats };
        });
      },

      unlockAchievement: (id) => {
        if (!get().achievements.includes(id)) {
          set((state) => ({ achievements: [...state.achievements, id] }));
          apiPost("achievement", { achievementId: id });
          get().addXp(250);
        }
      },

      toggleDailyTask: (taskId) => {
        const task = get().dailyTasks.find((t) => t.id === taskId);
        if (!task) return;
        const wasCompleted = task.completed;
        const newCompleted = !wasCompleted;
        set((state) => ({
          dailyTasks: state.dailyTasks.map((t) =>
            t.id === taskId ? { ...t, completed: newCompleted } : t
          ),
        }));
        apiPost("daily", { taskId, completed: newCompleted });
        if (!wasCompleted) get().addXp(task.xpReward);
      },

      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

      loadFromDB: async () => {
        try {
          const res = await fetch("/api/progress");
          if (!res.ok) return;
          const data = await res.json();
          if (data.error) return;

          set((state) => {
            const updates: Partial<ProgressStore> = { dbLoaded: true };

            if (data.stats) {
              updates.stats = {
                xp: data.stats.xp ?? state.stats.xp,
                level: data.stats.level ?? state.stats.level,
                streak: data.stats.streak ?? state.stats.streak,
                totalHoursStudied: data.stats.totalHoursStudied ?? state.stats.totalHoursStudied,
                lastActivityAt: data.stats.lastActivityAt ?? state.stats.lastActivityAt,
              };
            }

            if (data.nodeProgress && Object.keys(data.nodeProgress).length > 0) {
              updates.nodeProgress = data.nodeProgress;
            }

            if (data.projectProgress && Object.keys(data.projectProgress).length > 0) {
              updates.projectProgress = data.projectProgress;
            }

            if (data.achievements && data.achievements.length > 0) {
              updates.achievements = data.achievements;
            }

            if (data.dailyTaskCompletions) {
              const completions = data.dailyTaskCompletions as Record<string, boolean>;
              if (Object.keys(completions).length > 0) {
                updates.dailyTasks = state.dailyTasks.map((task) => ({
                  ...task,
                  completed: completions[task.id] ?? task.completed,
                }));
              }
            }

            return updates as ProgressStore;
          });
        } catch {
          // DB unavailable — localStorage state stays as-is
        }
      },
    }),
    { name: "roadmap-progress" }
  )
);
