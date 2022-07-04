export const csvFilterCalculator = (invoice: string[]): string[] | string => {
  if (invoice.length > 1) {
    const invoiceValues = invoice[1].split(',');
    const ivaField = invoiceValues[4];
    const igicField = invoiceValues[5];
    const cifField = invoiceValues[7];
    const nifField = invoiceValues[8];
    const totalAmount = Number(invoiceValues[3]);
    const amountWithoutTaxes = Number(invoiceValues[2])

    const totalAmountCalculatedWithIva = amountWithoutTaxes + (amountWithoutTaxes * Number(ivaField) / 100);
    const totalAmountCalculatedWithIgic = amountWithoutTaxes + (amountWithoutTaxes * Number(igicField) / 100);
    if (ivaField && igicField
      || (cifField && nifField)
      || (ivaField && totalAmount !== totalAmountCalculatedWithIva)
      || (igicField && totalAmount !== totalAmountCalculatedWithIgic)
    ) {
      return invoice[0];
    }
    return invoice;
  }
  return invoice.toString();
}