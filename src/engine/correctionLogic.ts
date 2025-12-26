export function applyCorrectionMemory(
  invoice: any,
  corrections: any[]
) {
  const proposedCorrections: string[] = [];
  const reasoning: string[] = [];

  for (const mem of corrections) {
    if (mem.confidence < 0.6) continue; // safety guard

    if (mem.issueType === "VAT_INCLUDED" && invoice.pricesIncludedVAT) {
      proposedCorrections.push("Recompute net/tax from gross");
      reasoning.push(
        `Applied VAT correction based on repeated human approval (${mem.confidence})`
      );
    }

    if (mem.issueType === "QTY_MISMATCH") {
      proposedCorrections.push(mem.correction);
      reasoning.push(
        `Quantity mismatch resolved using learned correction (${mem.confidence})`
      );
    }
  }

  return { proposedCorrections, reasoning };
}
