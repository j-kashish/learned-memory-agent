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
}
