const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSummaries(filter: string) {
  await delay(5000);
  return {};
}
