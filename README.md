# Code Kata: CSV Filter


## Description
CSV filter implements a function that given an array of invoices returns another array with valid invoices.


## Cases

- **[header]** -> header
- **[header, valid-invoice]** -> [header, valid-invoice]
- **[header, invalid-invoice-with-iva-and-igic]** -> [header]
- **[header, invalid-invoice-with-nif-and-cif]** -> [header]
- **[header, invalid-invoice-with-wrong-iva-total-amount]** -> [header]
- **[header, invalid-invoice-with-wrong-igic-total-amount]** -> [header]
- **[header, invoice-number-1, repeated-invoice-number-1]** -> [header]
- **[header, invoice-number-1, repeated-invoice-number-1, invoice-number-2]** -> [header, invoice-number-2]
- **[header, invoice-number-1, invoice-number-2]** -> [header, invoice-number-1, invoice-number-2]

## Run project
Install project dependencies:

`
npm install
`

To run all test in watch mode, run next command:

`
npm run test:watch
`
