import { SQLiteStore } from "./sqliteStore";
import { MemoryManager } from "./memory.manager";

const store = new SQLiteStore();
const manager = new MemoryManager(store);

manager.createMemory("Supplier GmbH uses Leistungsdatum as service date");
manager.createMemory("Parts AG prices include VAT");
manager.createMemory("Freight & Co uses Seefracht for shipping");

console.log(manager.search("service date"));



