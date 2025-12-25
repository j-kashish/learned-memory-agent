import { Memory } from "./memory.types";

export interface MemoryStore {
  add(memory: Memory): void;
  getAll(): Memory[];
  getByType(type: Memory["type"]): Memory[];
  clear(): void;
}

