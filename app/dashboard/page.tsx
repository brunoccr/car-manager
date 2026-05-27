import { Summaries } from "./components/Summaries";
import { SummariesSkeleton } from "./components/SummariesSkeleton";
import { Suspense } from "react";
import DashboardMain from "./main";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const dateFilter =
    (await cookies()).get("date_filter")?.value || "this_month";
  const carFilter = (await cookies()).get("car_filter")?.value || "all";

  return (
    <DashboardMain>
      <div className="mt-15 w-full flex justify-center">
        <Suspense key={dateFilter} fallback={<SummariesSkeleton />}>
          <Summaries filter={dateFilter} carFilter={carFilter} />
        </Suspense>
      </div>
    </DashboardMain>
  );
}
