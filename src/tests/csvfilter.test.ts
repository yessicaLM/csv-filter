import { csvFilterCalculator } from '../core/csvFilter';

// Some fields can be empty
// IVA and IGIC taxes fields are exclusives:
//    both fields with values, invoice not valid
// CIF and NIF fields are exclusives
//    both fields with values, invoice not valid
// Total amount is the result of amount + taxes:
//    wrong total amount, invoice not valid
// Invoice number must be unique


describe('CSV filter', () => {
  const header = 'Invoice_number, Date, Total_Amount, Amount, IVA, IGIC, Concept, CIF_client, NIF_client';  
  const invoice_1 = '1,02/05/2019,1000,1190,19,,ACER Laptop,B76430134,';
  const invoice_2 = '1,05/05/2019,100,190,19,,TOSHIBA Hard disk,B76430134,';
  const invoiceWithBothTaxes = '1,02/05/2019,1000,1190,19,7,ACER Laptop,B76430134,';

  it('only invoice header returns same invoice header', () => {
    expect(csvFilterCalculator([header])).toEqual(header);
  });

  it('allows empty fields', () => {
    expect(csvFilterCalculator([header, invoice_1])).toEqual([header, invoice_1]);
  });

  it('IVA and IGIC taxes fields are exclusives', () => {
    expect(csvFilterCalculator([header, invoiceWithBothTaxes])).toEqual(header);
  });
});
