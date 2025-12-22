export function formatMoneyTRY(value: number) {
  return `₺${Number(value).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
