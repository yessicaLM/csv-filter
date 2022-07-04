export const csvFilterCalculator = (invoice: string[]): string[] | string => {
  if (invoice.length > 1) {
    const invoiceValues = invoice[1].split(',');
    const ivaField = invoiceValues[4];
    const igicField = invoiceValues[5];
    const cifField = invoiceValues[7];
    const nifField = invoiceValues[8];
    const totalAmount = Number(invoiceValues[3]);
    const amountWithoutTaxes = Number(invoiceValues[2])

    const totalAmountCalculatedWithIva = amountWithoutTaxes + (Number(amountWithoutTaxes) * Number(ivaField) / 100);
    if (ivaField && igicField || (cifField && nifField) || (totalAmount !== totalAmountCalculatedWithIva)) {
      return invoice[0];
    }
    return invoice;
  }
  return invoice.toString();
}