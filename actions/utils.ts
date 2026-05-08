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
