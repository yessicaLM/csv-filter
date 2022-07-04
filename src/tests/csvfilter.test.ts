import { csvFilterCalculator } from '../core/csvFilter';

// Some fields can be empty
// IVA and IGIC taxes fields are exclusives: --> DONE
//    both fields with values, invoice not valid
// CIF and NIF fields are exclusives --> DONE
//    both fields with values, invoice not valid
// Total amount is the result of amount + taxes: --> DONE
//    wrong total amount, invoice not valid
// Invoice number must be unique


describe('CSV filter', () => {
  const header = 'Invoice_number, Date, Amount, Total_Amount, IVA, IGIC, Concept, CIF_client, NIF_client';  
  const invoice_1 = '1,02/05/2019,1000,1190,19,,ACER Laptop,B76430134,';
  const invoice_2 = '2,02/05/2019,1000,1070,,7,ACER Laptop,B76430134,';
  const invoice_2_with_wrong_number = '1,02/05/2019,1000,1070,,7,ACER Laptop,B76430134,';
  const invoiceWithBothTaxes = '1,02/05/2019,1000,1190,19,7,ACER Laptop,B76430134,';
  const invoiceWithNifAndCif = '1,05/05/2019,100,190,19,,TOSHIBA Hard disk,B76430134,76430134B';
  const invoiceWithIvaWithWrongTotalAmount  = '1,05/05/2019,100,190,19,,TOSHIBA Hard disk,B76430134,';
  const invoiceWithIva = '1,02/05/2019,1000,1190,19,,ACER Laptop,B76430134,';
  const invoiceWithIgicWithWrongTotalAmount = '1,05/05/2019,100,70,,7,TOSHIBA Hard disk,B76430134,';
  const invoicewithIgic = '1,02/05/2019,1000,1070,,7,ACER Laptop,B76430134,';

  it('only invoice header returns same invoice header', () => {
    expect(csvFilterCalculator([header])).toEqual(header);
  });

  it('allows empty fields', () => {
    expect(csvFilterCalculator([header, invoice_1])).toEqual([header, invoice_1]);
  });

  it('IVA and IGIC taxes fields are exclusives', () => {
    expect(csvFilterCalculator([header, invoiceWithBothTaxes])).toEqual([header]);
  });

  it('CIF and NIF fields are exclusives', () => {
    expect(csvFilterCalculator([header, invoiceWithNifAndCif])).toEqual([header]);
  });

  it('total amount with IVA is well calculated', () => {
    expect(csvFilterCalculator([header, invoiceWithIvaWithWrongTotalAmount ])).toEqual([header]);
    expect(csvFilterCalculator([header, invoiceWithIva])).toEqual([header, invoiceWithIva]);
  });

  it('total amount with IGIC is well calculated', () => {
    expect(csvFilterCalculator([header, invoicewithIgic])).toEqual([header, invoicewithIgic]);
    expect(csvFilterCalculator([header, invoiceWithIgicWithWrongTotalAmount])).toEqual([header]);
  });

  it('invoice number must be unique', () => {
    expect(csvFilterCalculator([header, invoice_1, invoice_2_with_wrong_number])).toEqual([header]);
    expect(csvFilterCalculator([header, invoice_1, invoice_2_with_wrong_number, invoice_2])).toEqual([header, invoice_2]);
    expect(csvFilterCalculator([header, invoice_1, invoice_2])).toEqual([header, invoice_1, invoice_2]);
  });
});
