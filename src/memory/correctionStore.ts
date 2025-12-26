import Database from "better-sqlite3";
import { CorrectionMemory } from "./correction.types";

export class CorrectionStore {
  private db: Database.Database;

  constructor() {
    this.db = new Database("data/memory.db");
    this.init();
  }

  private init() {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS correction_memory (
        id TEXT PRIMARY KEY,
        vendor TEXT,
        issueType TEXT,
        correction TEXT,
        confidence REAL,
        occurrences INTEGER,
        lastUpdated INTEGER
      )
    `).run();
  }

  upsert(memory: CorrectionMemory) {
    this.db.prepare(`
      INSERT INTO correction_memory
      (id, vendor, issueType, correction, confidence, occurrences, lastUpdated)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id)
      DO UPDATE SET
        occurrences = occurrences + 1,
        confidence = MIN(1.0, confidence + 0.15),
        lastUpdated = excluded.lastUpdated
    `).run(
      memory.id,
      memory.vendor,
      memory.issueType,
      memory.correction,
      memory.confidence,
      memory.occurrences,
      memory.lastUpdated
    );
  }

  getByVendor(vendor: string): CorrectionMemory[] {
    const rows = this.db
      .prepare(`SELECT * FROM correction_memory WHERE vendor = ?`)
      .all(vendor);

    return rows.map((row: any) => ({
      id: row.id,
      vendor: row.vendor,
      issueType: row.issueType,
      correction: row.correction,
      confidence: row.confidence,
      occurrences: row.occurrences,
      lastUpdated: row.lastUpdated
    }));
  }
}
