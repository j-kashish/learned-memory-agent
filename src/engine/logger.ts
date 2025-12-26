export function log(message: string, data?: unknown) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}
