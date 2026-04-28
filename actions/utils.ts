export function convertFilterDateToQuery(filter: string) {
  const now = new Date();
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
      Date.UTC(lastDate.getUTCFullYear(), 11, 0, 23, 59, 59, 999),
    );

    return `startdate >= "${formatDate(startDate)}" && startdate <= "${formatDate(lastDate)}"`;
  } else if (filter === "this_semester") {
    startDate.setMonth(now.getMonth() - 6);
    return `startdate >= "${formatDate(startDate)}"`;
  } else if (filter === "this_year") {
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
      Date.UTC(lastDate.getUTCFullYear(), 11, 0, 23, 59, 59, 999),
    );
    return `startdate >= "${formatDate(startDate)}" && startdate <= "${formatDate(lastDate)}"`;
  } else if (filter === "last_365_days") {
    startDate.setDate(now.getDate() - 365);
    return `startdate >= "${formatDate(startDate)}"`;
  } else if (filter === "all") {
    startDate.setDate(now.getDate() - 365);
    return `startdate >= "${formatDate(new Date(1900, 1, 1))}"`;
  }
}
