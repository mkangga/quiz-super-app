export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string; // e.g., 'Coding', 'General Knowledge'
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[]; // Can be empty array for external quizzes
  externalUrl?: string; // New field for external links
  iconName?: string; 
  createdAt: number;
  isLocked?: boolean; 
}

export enum GameState {
  IDLE,
  PLAYING,
  FINISHED
}