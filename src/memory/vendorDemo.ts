import { VendorStore } from "./vendorStore";
import { VendorMemoryManager } from "./vendor.manager";
import { applyVendorRules } from "../engine/vendorLogic";

const vendorStore = new VendorStore();
const vendorManager = new VendorMemoryManager(vendorStore);

/* 🔁 Learn from INV-A-001 */
vendorManager.learn({
  vendorName: "Supplier GmbH",
  key: "serviceDateLabel",
  value: "Leistungsdatum",
  confidence: 0.6,
  learnedAt: Date.now()
});

/* 🔁 New invoice */
const rawInvoice = {
  vendor: "Supplier GmbH",
  Leistungsdatum: "2025-12-01",
  invoiceNumber: "INV-A-003"
};

const memory = vendorManager.recall("Supplier GmbH");

const result = applyVendorRules(
  "Supplier GmbH",
  rawInvoice,
  memory
);

console.log(result);


