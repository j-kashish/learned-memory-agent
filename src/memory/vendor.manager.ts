import { VendorStore } from "./vendorStore";
import { VendorMemory } from "./vendor.types";

export class VendorMemoryManager {
  constructor(private store: VendorStore) {}

  learn(memory: VendorMemory) {
    this.store.upsert(memory);
  }

  recall(vendorName: string): VendorMemory[] {
    return this.store.get(vendorName);
  }
}
