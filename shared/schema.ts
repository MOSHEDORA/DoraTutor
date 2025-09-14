import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const learningPaths = pgTable("learning_paths", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  language: text("language").notNull(),
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  totalModules: integer("total_modules").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const modules = pgTable("modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  learningPathId: varchar("learning_path_id").references(() => learningPaths.id),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
  content: jsonb("content"), // topics, subtopics, examples, etc.
  isLocked: boolean("is_locked").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  learningPathId: varchar("learning_path_id").references(() => learningPaths.id),
  moduleId: varchar("module_id").references(() => modules.id),
  completed: boolean("completed").default(false),
  progress: integer("progress").default(0), // percentage
  lastAccessed: timestamp("last_accessed").defaultNow(),
});

export const customContent = pgTable("custom_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  type: text("type").notNull(), // youtube, pdf, website
  url: text("url"),
  title: text("title"),
  content: text("content"), // extracted/processed content
  status: text("status").default("processing"), // processing, completed, error
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  role: text("role").notNull(), // user, assistant
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const userStats = pgTable("user_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  weeklyGoal: integer("weekly_goal").default(15),
  hoursCompleted: integer("hours_completed").default(0),
  conceptsMastered: integer("concepts_mastered").default(0),
  streak: integer("streak").default(0),
  lastActiveDate: timestamp("last_active_date"),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  progress: many(userProgress),
  customContent: many(customContent),
  chatMessages: many(chatMessages),
  stats: one(userStats),
}));

export const learningPathsRelations = relations(learningPaths, ({ many }) => ({
  modules: many(modules),
  userProgress: many(userProgress),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  learningPath: one(learningPaths, {
    fields: [modules.learningPathId],
    references: [learningPaths.id],
  }),
  userProgress: many(userProgress),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  learningPath: one(learningPaths, {
    fields: [userProgress.learningPathId],
    references: [learningPaths.id],
  }),
  module: one(modules, {
    fields: [userProgress.moduleId],
    references: [modules.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertLearningPathSchema = createInsertSchema(learningPaths).omit({
  id: true,
  createdAt: true,
});

export const insertModuleSchema = createInsertSchema(modules).omit({
  id: true,
  createdAt: true,
});

export const insertCustomContentSchema = createInsertSchema(customContent).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LearningPath = typeof learningPaths.$inferSelect;
export type InsertLearningPath = z.infer<typeof insertLearningPathSchema>;
export type Module = typeof modules.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type CustomContent = typeof customContent.$inferSelect;
export type InsertCustomContent = z.infer<typeof insertCustomContentSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type UserStats = typeof userStats.$inferSelect;
