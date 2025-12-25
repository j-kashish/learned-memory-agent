import { InMemoryStore } from "../memory/inMemoryStore";
import { MemoryManager } from "../memory/memory.manager";

const store = new InMemoryStore();
const manager = new MemoryManager(store);

manager.remember("User is learning TypeScript", "fact", 4);
manager.remember("User prefers short explanations", "preference", 5);

console.log(manager.recall());
