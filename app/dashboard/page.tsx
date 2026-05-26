import { Summaries } from "./components/Summaries";
import { SummariesSkeleton } from "./components/SummariesSkeleton";
import { Suspense } from "react";
import DashboardMain from "./main";
import FilterProvider from "../contexts/FilterProvider";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const dateFilter =
    (await cookies()).get("date_filter")?.value || "this_month";

  return (
    <FilterProvider>
      <DashboardMain>
        <div className="mt-15 w-full flex justify-center">
          <Suspense key={dateFilter} fallback={<SummariesSkeleton />}>
            <Summaries filter={dateFilter} />
          </Suspense>
        </div>
      </DashboardMain>
    </FilterProvider>
  );
}
