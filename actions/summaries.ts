import { createServerClient } from "@/lib/pocketbase";
import { convertFilterDateToQuery } from "@actions/utils";

interface GetSummariesResult {
  success: boolean;
  error?: string;
  summary?: Summary;
}

interface Summary {
  totalPaid: number;
  consume: number;
  expenses: Expenses;
}

interface Expenses {
  fuel: Expense;
  maintenances: Expense;
}

interface Expense {
  quantity: number;
  value: number;
}

export async function getSummaries(
  filter: string,
): Promise<GetSummariesResult> {
  const pb = await createServerClient();

  try {
    const query = convertFilterDateToQuery(filter);

    const activities = await pb.collection("activities").getFullList({
      filter: `${query}`,
      sort: "-startdate",
    });

    const summary = {
      totalPaid: 0,
      consume: 0,
      expenses: {
        fuel: {
          quantity: 0,
          value: 0,
        },
        maintenances: {
          quantity: 0,
          value: 0,
        },
      },
    };

    const fuelFillType = "Reabastecimento";
    const maintenanceType = "Manutenção";

    const consumes: number[] = [];

    activities.forEach((a) => {
      summary.totalPaid += a.totalPaid;

      if (a.type === fuelFillType) {
        summary.expenses.fuel.quantity += 1;
        summary.expenses.fuel.value += a.totalPaid;

        const beforeActivity = activities.find(
          (f) =>
            f.id !== a.id &&
            new Date(f.startdate) < new Date(a.startdate) &&
            f.type === fuelFillType,
        );

        if (beforeActivity) {
          consumes.push((a.totalkm - beforeActivity.totalkm) / a.totalVolume);
        }
      } else if (a.type === maintenanceType) {
        summary.expenses.maintenances.quantity += 1;
        summary.expenses.maintenances.value += a.totalPaid;
      }
    });

    if (consumes.length) {
      summary.consume =
        consumes.reduce((acc, val) => acc + val, 0) / consumes.length;
    }

    return { success: true, summary };
  } catch (err) {
    console.log(err);
  }

  return { success: false, error: "Erro ao buscar resumo!" };
}
