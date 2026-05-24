import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function levelToXp(level: number): number {
  return Math.pow(level - 1, 2) * 100;
}

export function xpProgressToNextLevel(xp: number): number {
  const currentLevel = xpToLevel(xp);
  const currentLevelXp = levelToXp(currentLevel);
  const nextLevelXp = levelToXp(currentLevel + 1);
  return ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "beginner": return "text-emerald-400";
    case "intermediate": return "text-yellow-400";
    case "advanced": return "text-orange-400";
    case "expert": return "text-red-400";
    default: return "text-zinc-400";
  }
}

export function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case "beginner": return "Einsteiger";
    case "intermediate": return "Mittelstufe";
    case "advanced": return "Fortgeschritten";
    case "expert": return "Experte";
    default: return difficulty;
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "completed": return "text-emerald-400 bg-emerald-400/10";
    case "in_progress": return "text-blue-400 bg-blue-400/10";
    case "not_started": return "text-zinc-500 bg-zinc-800";
    default: return "text-zinc-500";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "completed": return "Abgeschlossen";
    case "in_progress": return "In Bearbeitung";
    case "not_started": return "Nicht begonnen";
    default: return status;
  }
}
