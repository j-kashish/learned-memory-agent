import Database from "better-sqlite3";
import { VendorMemory } from "./vendor.types";

export class VendorStore {
  private db: Database.Database;

  constructor() {
    this.db = new Database("data/memory.db");
    this.init();
  }

  private init() {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS vendor_memory (
        vendorName TEXT,
        key TEXT,
        value TEXT,
        confidence REAL,
        learnedAt INTEGER,
        PRIMARY KEY (vendorName, key)
      )
    `).run();
  }

  upsert(memory: VendorMemory): void {
    this.db.prepare(`
      INSERT INTO vendor_memory (vendorName, key, value, confidence, learnedAt)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(vendorName, key)
      DO UPDATE SET
        value = excluded.value,
        confidence = MIN(1.0, vendor_memory.confidence + 0.1),
        learnedAt = excluded.learnedAt
    `).run(
      memory.vendorName,
      memory.key,
      memory.value,
      memory.confidence,
      memory.learnedAt
    );
  }

  get(vendorName: string): VendorMemory[] {
    const rows = this.db
      .prepare(`SELECT vendorName, key, value, confidence, learnedAt FROM vendor_memory WHERE vendorName = ?`)
      .all(vendorName);

    // ✅ Explicit mapping fixes the error permanently
    return rows.map((row: any) => ({
      vendorName: row.vendorName,
      key: row.key,
      value: row.value,
      confidence: row.confidence,
      learnedAt: row.learnedAt
    }));
  }
}

