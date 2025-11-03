// src/types/index.ts
export type Exercise = {
  id: string;
  name: string;
  category: string;
  sets?: number;
  reps?: number;
  notes?: string;
};
