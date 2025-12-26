import { CorrectionStore } from "./correctionStore";
import { CorrectionMemoryManager } from "./correction.manager";
import { applyCorrectionMemory } from "../engine/correctionLogic";

const store = new CorrectionStore();
const manager = new CorrectionMemoryManager(store);

/* 👤 Human corrected INV-B-001 */
manager.learn({
  id: "PartsAG_VAT_INCLUDED",
  vendor: "Parts AG",
  issueType: "VAT_INCLUDED",
  correction: "Recompute net/tax from gross",
  confidence: 0.5,
  occurrences: 1,
  lastUpdated: Date.now()
});

/* 🔁 New invoice */
const invoice = {
  vendor: "Parts AG",
  pricesIncludedVAT: true
};

const memory = manager.recall("Parts AG");
const result = applyCorrectionMemory(invoice, memory);

console.log(result);
