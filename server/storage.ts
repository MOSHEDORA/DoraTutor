import { 
  users, learningPaths, modules, userProgress, customContent, chatMessages, userStats,
  type User, type InsertUser, type LearningPath, type InsertLearningPath,
  type Module, type InsertModule, type UserProgress, type CustomContent, 
  type InsertCustomContent, type ChatMessage, type InsertChatMessage,
  type UserStats
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Learning paths
  getAllLearningPaths(): Promise<LearningPath[]>;
  getLearningPath(id: string): Promise<LearningPath | undefined>;
  createLearningPath(path: InsertLearningPath): Promise<LearningPath>;
  
  // Modules
  getModulesByPath(pathId: string): Promise<Module[]>;
  getModule(id: string): Promise<Module | undefined>;
  createModule(module: InsertModule): Promise<Module>;
  
  // User progress
  getUserProgress(userId: string, pathId: string): Promise<UserProgress[]>;
  updateProgress(userId: string, moduleId: string, progress: number): Promise<UserProgress>;
  
  // Custom content
  getUserCustomContent(userId: string): Promise<CustomContent[]>;
  createCustomContent(content: InsertCustomContent): Promise<CustomContent>;
  updateCustomContentStatus(id: string, status: string, content?: string): Promise<void>;
  
  // Chat messages
  getUserChatMessages(userId: string, limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // User stats
  getUserStats(userId: string): Promise<UserStats | undefined>;
  updateUserStats(userId: string, stats: Partial<UserStats>): Promise<UserStats>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    // Initialize user stats
    await db.insert(userStats).values({ userId: user.id });
    return user;
  }

  async getAllLearningPaths(): Promise<LearningPath[]> {
    return await db.select().from(learningPaths).orderBy(asc(learningPaths.title));
  }

  async getLearningPath(id: string): Promise<LearningPath | undefined> {
    const [path] = await db.select().from(learningPaths).where(eq(learningPaths.id, id));
    return path || undefined;
  }

  async createLearningPath(path: InsertLearningPath): Promise<LearningPath> {
    const [newPath] = await db.insert(learningPaths).values(path).returning();
    return newPath;
  }

  async getModulesByPath(pathId: string): Promise<Module[]> {
    return await db.select().from(modules)
      .where(eq(modules.learningPathId, pathId))
      .orderBy(asc(modules.order));
  }

  async getModule(id: string): Promise<Module | undefined> {
    const [module] = await db.select().from(modules).where(eq(modules.id, id));
    return module || undefined;
  }

  async createModule(module: InsertModule): Promise<Module> {
    const [newModule] = await db.insert(modules).values(module).returning();
    return newModule;
  }

  async getUserProgress(userId: string, pathId: string): Promise<UserProgress[]> {
    return await db.select().from(userProgress)
      .where(and(
        eq(userProgress.userId, userId),
        eq(userProgress.learningPathId, pathId)
      ));
  }

  async updateProgress(userId: string, moduleId: string, progress: number): Promise<UserProgress> {
    const [existing] = await db.select().from(userProgress)
      .where(and(
        eq(userProgress.userId, userId),
        eq(userProgress.moduleId, moduleId)
      ));

    if (existing) {
      const [updated] = await db.update(userProgress)
        .set({ 
          progress, 
          completed: progress >= 100,
          lastAccessed: new Date()
        })
        .where(eq(userProgress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newProgress] = await db.insert(userProgress).values({
        userId,
        moduleId,
        progress,
        completed: progress >= 100,
      }).returning();
      return newProgress;
    }
  }

  async getUserCustomContent(userId: string): Promise<CustomContent[]> {
    return await db.select().from(customContent)
      .where(eq(customContent.userId, userId))
      .orderBy(desc(customContent.createdAt));
  }

  async createCustomContent(content: InsertCustomContent): Promise<CustomContent> {
    const [newContent] = await db.insert(customContent).values(content).returning();
    return newContent;
  }

  async updateCustomContentStatus(id: string, status: string, content?: string): Promise<void> {
    await db.update(customContent)
      .set({ status, content })
      .where(eq(customContent.id, id));
  }

  async getUserChatMessages(userId: string, limit: number = 50): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.userId, userId))
      .orderBy(desc(chatMessages.timestamp))
      .limit(limit);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db.insert(chatMessages).values(message).returning();
    return newMessage;
  }

  async getUserStats(userId: string): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats || undefined;
  }

  async updateUserStats(userId: string, statsUpdate: Partial<UserStats>): Promise<UserStats> {
    const [updated] = await db.update(userStats)
      .set(statsUpdate)
      .where(eq(userStats.userId, userId))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
