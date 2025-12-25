import { Memory } from "./memory.types";
import { MemoryStore } from "./memory.store";

export class InMemoryStore implements MemoryStore {
  private memories: Memory[] = [];

  add(memory: Memory): void {
    this.memories.push(memory);
  }

  getAll(): Memory[] {
    return this.memories;
  }

  getByType(type: Memory["type"]): Memory[] {
    return this.memories.filter(m => m.type === type);
  }

  clear(): void {
    this.memories = [];
  }
}
