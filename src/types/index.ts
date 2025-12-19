export interface CellData {
  r: number;
  c: number;
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  el: HTMLDivElement;
}

export interface DifficultyLevel {
  r: number;
  c: number;
  m: number;
}

export interface DifficultyLevels {
  easy: DifficultyLevel;
  medium: DifficultyLevel;
  hard: DifficultyLevel;
}

export interface CustomConfig {
  r: number;
  c: number;
  m: number;
}

export interface PendingScore {
  time: number;
  difficulty: string;
}

export type DifficultyKey = 'easy' | 'medium' | 'hard' | 'custom';
