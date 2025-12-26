export interface CorrectionMemory {
  id: string;
  vendor: string;
  issueType: string;        // e.g. "QTY_MISMATCH", "VAT_INCLUDED"
  correction: string;       // e.g. "Use DN quantity"
  confidence: number;       // 0 → 1
  occurrences: number;
  lastUpdated: number;
}
