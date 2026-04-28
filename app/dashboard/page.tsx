import { Summaries } from "./components/Summaries";
import { SummariesSkeleton } from "./components/SummariesSkeleton";
import { Suspense } from "react";
import DashboardMain from "./main";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  let { filter } = await searchParams;
  filter = filter || "this_month";

  return (
    <DashboardMain>
      <div className="mt-15 w-full flex justify-center">
        <Suspense key={filter} fallback={<SummariesSkeleton />}>
          <Summaries filter={filter} />
        </Suspense>
      </div>
    </DashboardMain>
  );
}
