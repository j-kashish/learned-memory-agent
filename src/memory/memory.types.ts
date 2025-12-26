export interface Memory {
  id: string;
  content: string;
  embedding?: number[];   // MUST be optional
  createdAt: number;
}
