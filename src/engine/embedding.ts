export function generateEmbedding(text: string): number[] {
  const words = text.toLowerCase().split(" ");

  // Simple numeric embedding
  return words.map(word =>
    word.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  );
}
