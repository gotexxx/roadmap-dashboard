import { pgTable, text, integer, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  streak: integer("streak").notNull().default(0),
  lastActivityAt: timestamp("last_activity_at").defaultNow(),
  totalHoursStudied: integer("total_hours_studied").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const roadmapProgress = pgTable("roadmap_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  nodeId: text("node_id").notNull(),
  status: text("status").notNull().default("not_started"), // not_started | in_progress | completed
  completedAt: timestamp("completed_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectProgress = pgTable("project_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  projectId: text("project_id").notNull(),
  status: text("status").notNull().default("not_started"),
  checklistState: jsonb("checklist_state").default({}),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  achievementId: text("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const dailyTasks = pgTable("daily_tasks", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().default("default"),
  taskId: text("task_id").notNull(),
  date: text("date").notNull(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
