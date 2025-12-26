import { MemoryManager } from "../memory/memory.manager";
import { InMemoryStore } from "../memory/inMemoryStore";
import { decide } from "../engine/decisionEngine";

// ----------------------
// Setup
// ----------------------
const store = new InMemoryStore();
const memoryManager = new MemoryManager(store);

// ----------------------
// Invoice #1 (FIRST TIME)
// ----------------------
console.log("\n--- Invoice #1 ---");

const recalled1 = memoryManager.recall("Leistungsdatum");

let confidence1 = 0.4; // low confidence (no prior learning)
let decision1 = decide(confidence1);

console.log("Recalled Memory:", recalled1);
console.log("Confidence:", confidence1);
console.log("Decision:", decision1);

// Simulate human correction
console.log("\nHuman approved correction → learning stored");

memoryManager.addMemory(
  "Supplier GmbH: Leistungsdatum maps to serviceDate"
);

// ----------------------
// Invoice #2 (AFTER LEARNING)
// ----------------------
console.log("\n--- Invoice #2 ---");

const recalled2 = memoryManager.recall("Leistungsdatum");

let confidence2 = 0.85; // increased confidence
let decision2 = decide(confidence2);

console.log("Recalled Memory:", recalled2);
console.log("Confidence:", confidence2);
console.log("Decision:", decision2);

