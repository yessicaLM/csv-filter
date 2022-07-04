export const csvFilterCalculator = (invoice: string[]): string[] | string => {
  if (invoice.length > 1) {
    const invoiceValues = invoice[1].split(',');
    const ivaField = invoiceValues[4];
    const igicField = invoiceValues[5];
    const cifField = invoiceValues[7];
    const nifField = invoiceValues[8];
    if (ivaField && igicField || (cifField && nifField)) {
      return invoice[0];
    }
    return invoice;
  }
  return invoice.toString();
}