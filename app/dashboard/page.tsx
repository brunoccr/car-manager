import { Summaries } from "../components/Summaries";
import { SummariesSkeleton } from "../components/SummariesSkeleton";
import { Suspense } from "react";
import DashboardMain from "./main";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  let { filter } = await searchParams;
  filter = filter || "seven_days";

  return (
    <DashboardMain>
      <Suspense key={filter} fallback={<SummariesSkeleton />}>
        <Summaries filter={filter} />
      </Suspense>
    </DashboardMain>
  );
}
