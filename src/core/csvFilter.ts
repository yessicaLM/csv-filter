export const csvFilterCalculator = (invoice: string[]): string[] | string => {
  if (invoice.length > 1) {
    return invoice;
  }
  return invoice.toString();
}