import Database from "better-sqlite3";
import { Memory } from "./memory.types";
import { MemoryStore } from "./memory.store";

export class SQLiteStore implements MemoryStore {
  private db: Database.Database;

  constructor() {
    this.db = new Database("data/memory.db");
    this.init();
  }

  private init() {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS memories (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        embedding TEXT NOT NULL,
        createdAt INTEGER NOT NULL
      )
    `).run();
  }

  add(memory: Memory): void {
    this.db.prepare(`
      INSERT INTO memories (id, content, embedding, createdAt)
      VALUES (?, ?, ?, ?)
    `).run(
      memory.id,
      memory.content,
      JSON.stringify(memory.embedding),
      memory.createdAt
    );
  }

  getAll(): Memory[] {
    return this.db.prepare(`SELECT * FROM memories`).all().map(this.mapRow);
  }

  getById(id: string): Memory | undefined {
    const row = this.db.prepare(`SELECT * FROM memories WHERE id = ?`).get(id);
    return row ? this.mapRow(row) : undefined;
  }

  update(memory: Memory): void {
    this.db.prepare(`
      UPDATE memories
      SET content = ?, embedding = ?, createdAt = ?
      WHERE id = ?
    `).run(
      memory.content,
      JSON.stringify(memory.embedding),
      memory.createdAt,
      memory.id
    );
  }

  deleteById(id: string): boolean {
    const result = this.db.prepare(
      `DELETE FROM memories WHERE id = ?`
    ).run(id);
    return result.changes > 0;
  }

  private mapRow(row: any): Memory {
    return {
      id: row.id,
      content: row.content,
      embedding: JSON.parse(row.embedding),
      createdAt: row.createdAt
    };
  }
}
