import { Memory } from "./memory.types";

export interface MemoryStore {
  add(memory: Memory): void;
  getAll(): Memory[];
}
