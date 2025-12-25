import { Memory } from "./memory.types";
import { MemoryStore } from "./memory.store";

export class MemoryManager {
  constructor(private store: MemoryStore) {}

  remember(content: string, type: Memory["type"], importance = 3) {
    const memory: Memory = {
      id: crypto.randomUUID(),
      content,
      type,
      importance,
      createdAt: Date.now(),
    };

    this.store.add(memory);
  }

  recall(type?: Memory["type"]): Memory[] {
    return type ? this.store.getByType(type) : this.store.getAll();
  }

  forgetAll() {
    this.store.clear();
  }
}
