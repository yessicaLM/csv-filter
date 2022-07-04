import { csvFilterCalculator } from '../core/csvFilter';


describe('CSV filter', () => {
  const header = 'Invoice_number, Date, Amount, Total_Amount, IVA, IGIC, Concept, CIF_client, NIF_client';
  const invoice_1 = '1,02/05/2019,1000,1190,19,,ACER Laptop,B76430134,';

  it('only invoice header returns same invoice header', () => {
    const expected = header;
    const currentValue = [header];

    expect(csvFilterCalculator(currentValue)).toEqual(expected);
  });

  it('allows empty fields', () => {
    const expected = [header, invoice_1];
    const currentValue = [header, invoice_1];

    expect(csvFilterCalculator(currentValue)).toEqual(expected);
  });

  it('IVA and IGIC taxes fields are exclusives', () => {
    const invoiceWithBothTaxes = '1,02/05/2019,1000,1190,19,7,ACER Laptop,B76430134,';
    const expected = [header];
    const currentValue = [header, invoiceWithBothTaxes];

    expect(csvFilterCalculator(currentValue)).toEqual(expected);
  });

  it('CIF and NIF fields are exclusives', () => {
    const invoiceWithNifAndCif = '1,05/05/2019,100,190,19,,TOSHIBA Hard disk,B76430134,76430134B';
    const expected = [header];
    const currentValue = [header, invoiceWithNifAndCif];

    expect(csvFilterCalculator(currentValue)).toEqual(expected);
  });

  it('total amount with IVA is well calculated', () => {
    const invoiceWithIva = '1,02/05/2019,1000,1190,19,,ACER Laptop,B76430134,';
    const invoiceWithIvaWithWrongTotalAmount = '1,05/05/2019,100,190,19,,TOSHIBA Hard disk,B76430134,';

    let expected = [header];
    let currentValue = [header, invoiceWithIvaWithWrongTotalAmount];
    expect(csvFilterCalculator(currentValue)).toEqual(expected);

    expected = [header, invoiceWithIva];
    currentValue = [header, invoiceWithIva];
    expect(csvFilterCalculator(currentValue)).toEqual(expected);
  });

  it('total amount with IGIC is well calculated', () => {
    const invoicewithIgic = '1,02/05/2019,1000,1070,,7,ACER Laptop,B76430134,';
    const invoiceWithIgicWithWrongTotalAmount = '1,05/05/2019,100,70,,7,TOSHIBA Hard disk,B76430134,';

    let expected = [header, invoicewithIgic];
    let currentValue = [header, invoicewithIgic];
    expect(csvFilterCalculator(currentValue)).toEqual(expected);

    expected = [header];
    currentValue = [header, invoiceWithIgicWithWrongTotalAmount];
    expect(csvFilterCalculator(currentValue)).toEqual(expected);
  });

  it('invoice number must be unique', () => {
    const invoice_2 = '2,02/05/2019,1000,1070,,7,ACER Laptop,B76430134,';
    const invoice_2_with_wrong_number = '1,02/05/2019,1000,1070,,7,ACER Laptop,B76430134,';

    let expected = [header];
    let currentValue = [header, invoice_1, invoice_2_with_wrong_number];
    expect(csvFilterCalculator(currentValue)).toEqual(expected);

    expected = [header, invoice_2];
    currentValue = [header, invoice_1, invoice_2_with_wrong_number, invoice_2];
    expect(csvFilterCalculator(currentValue)).toEqual(expected);

    expected = [header, invoice_1, invoice_2];
    currentValue = [header, invoice_1, invoice_2];
    expect(csvFilterCalculator(currentValue)).toEqual(expected);
  });
});
