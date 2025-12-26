import crypto from "crypto";
import { Memory } from "./memory.types";
import { MemoryStore } from "./memory.store";

/**
 * Simple logger for audit & debugging
 */
function log(message: string, data?: unknown) {
  console.log(`[MemoryManager] ${message}`, data ?? "");
}

/**
 * ✅ NAMED EXPORT (important)
 */
export class MemoryManager {
  private store: MemoryStore;

  constructor(store: MemoryStore) {
    this.store = store;
  }

  /**
   * Add a new memory
   */
  addMemory(content: string, embedding?: number[]): Memory {
    const memory: Memory = {
      id: crypto.randomUUID(),
      content,
      createdAt: Date.now()
    };

    // only attach embedding if it exists
    if (embedding !== undefined) {
      memory.embedding = embedding;
    }

    this.store.add(memory);
    log("Memory added", memory);

    return memory;
  }

  /**
   * Get all memories
   */
  getAllMemories(): Memory[] {
    const memories = this.store.getAll();
    log("All memories retrieved", memories);
    return memories;
  }

  /**
   * OPTIONAL: alias for older demos
   */
  createMemory(content: string, embedding?: number[]): Memory {
    return this.addMemory(content, embedding);
  }
  /**
 * Recall memories based on context/query
 * (Assignment language: "Recall Memory")
 */
recall(context: string) {
  const result = this.store
    .getAll()
    .filter(memory =>
      memory.content.toLowerCase().includes(context.toLowerCase())
    );

  console.log("[MemoryManager] Memory recalled", {
    context,
    result
  });

  return result;
}

}

