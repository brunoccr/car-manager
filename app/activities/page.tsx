import { Activities } from "./components/Activities";
import { Suspense } from "react";
import ActivitiesMain from "./main";
import { ActivitiesSkeleton } from "./components/ActivitiesSkeleton";

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  let { filter } = await searchParams;
  filter = filter || "this_month";

  return (
    <ActivitiesMain>
      <div className="mt-15 w-full flex justify-center">
        <Suspense key={filter} fallback={<ActivitiesSkeleton />}>
          <Activities filter={filter} />
        </Suspense>
      </div>
    </ActivitiesMain>
  );
}
