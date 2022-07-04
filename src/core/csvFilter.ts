export const csvFilterCalculator = (invoice: string[]): string[] | string => {
  if (invoice.length > 1) {
    const invoiceValues = invoice[1].split(',');
    const ivaField = invoiceValues[4];
    const igicField = invoiceValues[5];
    if (ivaField && igicField) {
      return invoice[0];
    }
    return invoice;
  }
  return invoice.toString();
}