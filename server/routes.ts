import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { localAIService } from "./services/openai";
import multer from "multer";
import { z } from "zod";
import { insertLearningPathSchema, insertCustomContentSchema, insertChatMessageSchema } from "@shared/schema";

// Extend Request interface for multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Learning Paths
  app.get("/api/learning-paths", async (req, res) => {
    try {
      const paths = await storage.getAllLearningPaths();
      res.json(paths);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch learning paths" });
    }
  });

  app.post("/api/learning-paths", async (req, res) => {
    try {
      const validatedData = insertLearningPathSchema.parse(req.body);
      const path = await storage.createLearningPath(validatedData);
      res.json(path);
    } catch (error) {
      res.status(400).json({ error: "Invalid learning path data" });
    }
  });

  app.get("/api/learning-paths/:id/modules", async (req, res) => {
    try {
      const { id } = req.params;
      const modules = await storage.getModulesByPath(id);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });

  // AI Tutor
  app.post("/api/ai-tutor/generate-path", async (req, res) => {
    try {
      const requestSchema = z.object({
        language: z.string(),
        goals: z.array(z.string()),
        experience: z.string(),
        timeCommitment: z.string(),
      });
      
      const validatedData = requestSchema.parse(req.body);
      const learningPath = await localAIService.generateLearningPath(validatedData);
      
      // Save the generated path
      const savedPath = await storage.createLearningPath({
        title: learningPath.title,
        description: learningPath.description,
        language: learningPath.language,
        difficulty: learningPath.difficulty,
        totalModules: learningPath.modules.length,
      });

      // Save modules
      for (const moduleData of learningPath.modules) {
        await storage.createModule({
          learningPathId: savedPath.id,
          title: moduleData.title,
          description: moduleData.description,
          order: moduleData.order,
          content: moduleData,
          isLocked: moduleData.order > 1,
        });
      }

      res.json(savedPath);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate learning path" });
    }
  });

  app.post("/api/ai-tutor/chat", async (req, res) => {
    try {
      const chatSchema = z.object({
        userId: z.string(),
        message: z.string(),
        context: z.string().optional(),
      });

      const { userId, message, context } = chatSchema.parse(req.body);
      
      // Save user message
      await storage.createChatMessage({
        userId,
        role: "user",
        content: message,
      });

      // Get AI response
      const aiResponse = await localAIService.chatWithTutor(message, context);
      
      // Save AI response
      await storage.createChatMessage({
        userId,
        role: "assistant",
        content: aiResponse.message,
      });

      res.json(aiResponse);
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Chat Messages
  app.get("/api/chat-messages/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const messages = await storage.getUserChatMessages(userId);
      res.json(messages.reverse()); // Return in chronological order
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  // User Progress
  app.get("/api/users/:userId/progress/:pathId", async (req, res) => {
    try {
      const { userId, pathId } = req.params;
      const progress = await storage.getUserProgress(userId, pathId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user progress" });
    }
  });

  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const { userId } = req.params;
      const progressSchema = z.object({
        moduleId: z.string(),
        progress: z.number().min(0).max(100),
      });

      const { moduleId, progress } = progressSchema.parse(req.body);
      const updatedProgress = await storage.updateProgress(userId, moduleId, progress);
      res.json(updatedProgress);
    } catch (error) {
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  // User Stats
  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const { userId } = req.params;
      const stats = await storage.getUserStats(userId);
      if (!stats) {
        return res.status(404).json({ error: "User stats not found" });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user stats" });
    }
  });

  // Custom Content Upload
  app.post("/api/custom-content", upload.single('file'), async (req, res) => {
    try {
      const contentSchema = insertCustomContentSchema.extend({
        type: z.enum(['youtube', 'pdf', 'website']),
      });

      let contentData;
      
      if (req.body.type === 'pdf' && (req as MulterRequest).file) {
        // Process PDF file
        const fs = await import('fs');
        const multerFile = (req as MulterRequest).file!;
        const pdfContent = fs.readFileSync(multerFile.path, 'utf8');
        const processedContent = await localAIService.processPDFContent(pdfContent);
        
        contentData = {
          ...req.body,
          title: multerFile.originalname,
          content: processedContent,
          status: 'completed',
        };
        
        // Clean up uploaded file
        fs.unlinkSync(multerFile.path);
      } else if (req.body.type === 'youtube') {
        // Process YouTube URL
        const processedContent = await localAIService.processYouTubeContent(req.body.url);
        contentData = {
          ...req.body,
          content: processedContent,
          status: 'completed',
        };
      } else if (req.body.type === 'website') {
        // In a real implementation, you would scrape the website content
        // For now, we'll create a placeholder
        contentData = {
          ...req.body,
          content: `Website content from ${req.body.url}`,
          status: 'completed',
        };
      }

      const validatedData = contentSchema.parse(contentData);
      const customContent = await storage.createCustomContent(validatedData);
      res.json(customContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to process custom content" });
    }
  });

  app.get("/api/users/:userId/custom-content", async (req, res) => {
    try {
      const { userId } = req.params;
      const content = await storage.getUserCustomContent(userId);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch custom content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
