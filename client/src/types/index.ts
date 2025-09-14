export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: string;
  totalModules: number;
}

export interface Module {
  id: string;
  learningPathId: string;
  title: string;
  description: string;
  order: number;
  content: any;
  isLocked: boolean;
}

export interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  completed: boolean;
  progress: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface UserStats {
  weeklyGoal: number;
  hoursCompleted: number;
  conceptsMastered: number;
  streak: number;
}

export interface CustomContent {
  id: string;
  type: 'youtube' | 'pdf' | 'website';
  url?: string;
  title: string;
  status: 'processing' | 'completed' | 'error';
}
