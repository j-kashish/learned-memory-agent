export function applyVendorRules(
  vendor: string,
  rawInvoice: any,
  vendorMemory: any[]
) {
  const normalized = { ...rawInvoice };
  const reasoning: string[] = [];

  for (const mem of vendorMemory) {
    if (mem.key === "serviceDateLabel" && rawInvoice[mem.value]) {
      normalized.serviceDate = rawInvoice[mem.value];
      reasoning.push(
        `Filled serviceDate from ${mem.value} using vendor memory (${vendor})`
      );
    }

    if (mem.key === "vatIncluded" && rawInvoice.pricesIncludedVAT) {
      normalized.vatMode = "INCLUDED";
      reasoning.push(`Applied VAT included logic for ${vendor}`);
    }
  }

  return { normalized, reasoning };
}
