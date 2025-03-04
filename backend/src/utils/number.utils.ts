export function formatPercentage(value: number, total: number): number {
  return total > 0 ? Math.round((1000 * value) / total) / 10 : 0;
}
