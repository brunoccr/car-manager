import { RecordModel } from "pocketbase";

export function convertFilterDateToQuery(filter: string) {
  const formatDate = (date: Date) =>
    date.toISOString().replace("T", " ").split(".")[0];

  let startDate = new Date();
  let lastDate = new Date();

  if (filter === "this_month") {
    startDate = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        1,
        0,
        0,
        0,
        0,
      ),
    );
    lastDate = new Date(
      Date.UTC(
        lastDate.getUTCFullYear(),
        lastDate.getUTCMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      ),
    );

    return `startdate >= "${formatDate(startDate)}" && startdate <= "${formatDate(lastDate)}"`;
  } else if (filter === "last_month") {
    startDate = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth() - 1,
        1,
        0,
        0,
        0,
        0,
      ),
    );
    lastDate = new Date(
      Date.UTC(
        lastDate.getUTCFullYear(),
        lastDate.getUTCMonth(),
        0,
        23,
        59,
        59,
        999,
      ),
    );

    return `startdate >= "${formatDate(startDate)}" && startdate <= "${formatDate(lastDate)}"`;
  } else if (filter === "this_semester") {
    if (startDate.getMonth() < 6) {
      startDate = new Date(Date.UTC(startDate.getFullYear(), 0, 1, 0, 0, 0, 0));
      lastDate = new Date(
        Date.UTC(lastDate.getFullYear(), 5, 30, 23, 59, 59, 999),
      );
    } else {
      startDate = new Date(Date.UTC(startDate.getFullYear(), 6, 1, 0, 0, 0, 0));
      lastDate = new Date(
        Date.UTC(lastDate.getFullYear(), 11, 31, 23, 59, 59, 999),
      );
    }

    return `startdate >= "${formatDate(startDate)}" && startdate <= "${formatDate(lastDate)}"`;
  } else if (filter === "this_year") {
    startDate = new Date(
      Date.UTC(startDate.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
    );
    lastDate = new Date(
      Date.UTC(lastDate.getUTCFullYear() + 1, 0, 0, 23, 59, 59, 999),
    );
    return `startdate >= "${formatDate(startDate)}" && startdate <= "${formatDate(lastDate)}"`;
  } else if (filter === "last_365_days") {
    startDate = new Date(
      Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate(),
        0,
        0,
        0,
        0,
      ),
    );
    startDate.setDate(startDate.getDate() - 365);
    return `startdate >= "${formatDate(startDate)}"`;
  } else if (filter === "all") {
    return `startdate >= "${formatDate(new Date(Date.UTC(1900, 0, 1, 0, 0, 0)))}"`;
  }
}

export function updateConsumeActivities(
  activities: RecordModel[],
): RecordModel[] {
  const fuelFillType = "Reabastecimento";

  activities.forEach((a, aIndex) => {
    if (a.type !== fuelFillType) {
      return;
    }

    if (a.fill) {
      const bIndex = activities.findIndex(
        (e) =>
          e.id !== a.id &&
          e.expand?.car.id === a.expand?.car.id &&
          e.totalkm < a.totalkm &&
          e.type === fuelFillType &&
          e.fill,
      );

      if (bIndex == -1) {
        a["KMPerLitres"] = 0;
        return;
      }

      const relevantEntries = activities.slice(aIndex, bIndex);
      const totalLiters = relevantEntries.reduce(
        (acc, curr) => acc + curr.totalVolume,
        0,
      );

      const totalDistance = a.totalkm - activities[bIndex].totalkm;

      a["KMPerLitres"] = totalDistance / totalLiters;
    } else {
      a["KMPerLitres"] = 0;
    }
  });

  return activities;
}
