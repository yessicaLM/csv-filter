export const csvFilterCalculator = (invoiceEntry: string[]): string[] | string => {
  const header = invoiceEntry.shift();
  const listOfInvoices = invoiceEntry;

  if (listOfInvoices.length) {
    const idsOfValidInvoices = [];

    listOfInvoices.forEach(element => {
      const elementId = element.split(',')[0]
      if (!idsOfValidInvoices.includes(elementId)) {
        idsOfValidInvoices.push(element.split(',')[0])
      } else {
        idsOfValidInvoices.splice(idsOfValidInvoices.indexOf(elementId))
      }
    });

    const validInvoices = [header];
    listOfInvoices.forEach(invoice => {
      const invoiceValues = invoice.split(',');
      if (idsOfValidInvoices.includes(invoiceValues[0])) {

        const ivaField = invoiceValues[4];
        const igicField = invoiceValues[5];
        const cifField = invoiceValues[7];
        const nifField = invoiceValues[8];
        const totalAmount = Number(invoiceValues[3]);
        const amountWithoutTaxes = Number(invoiceValues[2])

        const totalAmountCalculatedWithIva = amountWithoutTaxes + (amountWithoutTaxes * Number(ivaField) / 100);
        const totalAmountCalculatedWithIgic = amountWithoutTaxes + (amountWithoutTaxes * Number(igicField) / 100);
        if (!(ivaField && igicField
          || (cifField && nifField)
          || (ivaField && totalAmount !== totalAmountCalculatedWithIva)
          || (igicField && totalAmount !== totalAmountCalculatedWithIgic))
        ) {
          validInvoices.push(invoice);
        } 
      }
    });
    return validInvoices;
  }
  return header;
}