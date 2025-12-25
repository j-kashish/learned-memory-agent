import Database from "better-sqlite3";

const db = new Database("memory.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS test_memory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    note TEXT
  )
`).run();

console.log("✅ Database initialized successfully");
