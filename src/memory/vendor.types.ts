export interface VendorMemory {
  vendorName: string;
  key: string;              // e.g. "serviceDateLabel"
  value: string;            // e.g. "Leistungsdatum"
  confidence: number;       // 0 → 1
  learnedAt: number;
}
