import { Activities } from "./components/Activities";
import { Suspense } from "react";
import ActivitiesMain from "./main";
import { ActivitiesSkeleton } from "./components/ActivitiesSkeleton";
import { cookies } from "next/headers";

export default async function ActivitiesPage() {
  const dateFilter =
    (await cookies()).get("date_filter")?.value || "this_month";
  const carFilter = (await cookies()).get("car_filter")?.value || "all";

  return (
    <ActivitiesMain>
      <div className="mt-15 w-full flex justify-center">
        <Suspense key={dateFilter} fallback={<ActivitiesSkeleton />}>
          <Activities filter={dateFilter} carFilter={carFilter} />
        </Suspense>
      </div>
    </ActivitiesMain>
  );
}
