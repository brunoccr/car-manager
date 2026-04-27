"use server";

import { getSummaries } from "@/actions/summaries";

export async function Summaries({ filter }: { filter: string }) {
  const summary = await getSummaries(filter);

  return (
    <div className="flex flex-col p-5 w-full gap-5">
      <div className="flex items-center justify-center h-25 bg-slate-800 rounded-base rounded-2xl">
        [CONSUMO]
      </div>
      <div className="flex items-center justify-center h-45 bg-slate-800 rounded-base rounded-2xl">
        [SUMÁRIO]
      </div>
      <div className="flex items-center justify-center h-80 bg-slate-800 rounded-base rounded-2xl">
        [DISTRIBUIÇÃO DE GASTOS]
      </div>
    </div>
  );
}
