import { CorrectionStore } from "./correctionStore";
import { CorrectionMemory } from "./correction.types";

export class CorrectionMemoryManager {
  constructor(private store: CorrectionStore) {}

  learn(memory: CorrectionMemory) {
    this.store.upsert(memory);
  }

  recall(vendor: string): CorrectionMemory[] {
    return this.store.getByVendor(vendor);
  }
}
