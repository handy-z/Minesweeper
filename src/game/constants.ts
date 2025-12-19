import type { DifficultyLevels } from '../types';

export const DIFFICULTY_LEVELS: DifficultyLevels = {
  easy: { r: 9, c: 9, m: 10 },
  medium: { r: 16, c: 16, m: 40 },
  hard: { r: 16, c: 30, m: 99 },
};

export const HINTS_PER_GAME = 3;
