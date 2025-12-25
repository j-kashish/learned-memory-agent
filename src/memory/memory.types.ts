export type MemoryType =
  | "conversation"
  | "fact"
  | "preference"
  | "system";

export interface Memory {
  id: string;
  content: string;
  type: MemoryType;
  importance: number; // 1–5
  embedding?: number[];
  createdAt: number;
}
