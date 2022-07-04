const LIST_SEPARATOR = ',';

const divideInvoiceBySections = (invoice: string[]) => {
  const invoiceHeader = invoice.shift();
  const listOfInvoices: string[] = invoice;
  return { invoiceHeader, listOfInvoices };
}

const listOfUniquesInvoicesIds = (invoicesList: string[]): string[] => {
  const idsOfValidInvoices = [];

  invoicesList.forEach(element => {
    const elementId = element.split(LIST_SEPARATOR)[0];
    idsOfValidInvoices.includes(elementId)
      ? idsOfValidInvoices.splice(idsOfValidInvoices.indexOf(elementId))
      : idsOfValidInvoices.push(elementId);
  });
  return idsOfValidInvoices;
}

const ivaAndIgicAreExclusives = (ivaValue: number, igicValue: number): boolean => !(ivaValue && igicValue);
const cifAndNifAreExclusives = (cifValue: string, nifValue: string): boolean => !(cifValue && nifValue);

const calculateAmountWithTaxes = (amount: number, tax: number): number => amount + (amount * tax / 100);

export const csvFilterCalculator = (baseInvoices: string[]): string[] | string => {
  const { invoiceHeader, listOfInvoices } = divideInvoiceBySections(baseInvoices);

  if (listOfInvoices.length) {
    const validInvoices = [invoiceHeader];
    const idsOfValidInvoices = listOfUniquesInvoicesIds(listOfInvoices);

    listOfInvoices.forEach((invoice: string) => {
      const invoiceValues = invoice.split(LIST_SEPARATOR);
      
      if (idsOfValidInvoices.includes(invoiceValues[0])) {
        const ivaField = invoiceValues[4] && Number(invoiceValues[4]);
        const igicField = invoiceValues[5] && Number(invoiceValues[5]);
        const cifField = invoiceValues[7];
        const nifField = invoiceValues[8];
        const totalAmount = Number(invoiceValues[3]);
        const amountWithoutTaxes = Number(invoiceValues[2]);

        const selectedTax = ivaField ? ivaField : igicField;

        if ((ivaAndIgicAreExclusives(ivaField, igicField)
          && cifAndNifAreExclusives(cifField, nifField))
          && totalAmount === calculateAmountWithTaxes(amountWithoutTaxes, selectedTax)
        ) {
          validInvoices.push(invoice);
        }
      }
    });
    return validInvoices;
  }
  return invoiceHeader;
}