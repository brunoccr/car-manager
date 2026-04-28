import { createServerClient } from "@/lib/pocketbase";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSummaries(filter: string) {
  const pb = await createServerClient();

  await delay(2000);

  try {
    const activities = await pb
      .collection("activities")
      .getFullList({ filter: "" });
  } catch (err) {
    console.log(err);
  }

  return {};
}
