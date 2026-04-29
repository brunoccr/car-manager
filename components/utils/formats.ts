export const formatNumber = (
  value: number | undefined,
  precision: number = 0,
) => {
  if (value == undefined) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
};

export const formatDate = (value: string) => {
  const refDate = new Date(value);

  const strDay = refDate.getDate().toString().padStart(2, "0");
  const strMonth = (refDate.getMonth() + 1).toString().padStart(2, "0");
  const strYear = refDate.getFullYear();

  return `${strDay}/${strMonth}/${strYear}`;
};
