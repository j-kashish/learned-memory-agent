import { Decision } from "./decision.types";

/**
 * Decide what to do based on confidence
 */
export function decide(confidenceScore: number): Decision {
  if (confidenceScore >= 0.8) {
    return "AUTO_ACCEPT";
  }

  if (confidenceScore >= 0.5) {
    return "AUTO_CORRECT";
  }

  return "HUMAN_REVIEW";
}
