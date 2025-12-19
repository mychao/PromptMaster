export enum AppMode {
  GENERATE = 'GENERATE',
  OPTIMIZE = 'OPTIMIZE',
  TEMPLATES = 'TEMPLATES'
}

export interface OptimizationResult {
  prompt: string;
  reasoning: string;
  facts: string[];
  improvementType: 'clarity' | 'structure' | 'constraints' | 'context';
}

export interface GenerationResult {
  prompt: string;
  reasoning: string;
  facts: string[];
}

export interface FileInput {
  name: string;
  mimeType: string;
  data: string; // Base64
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Business' | 'Coding' | 'Writing' | 'Marketing' | 'Education' | 'Other';
  content: string;
}
