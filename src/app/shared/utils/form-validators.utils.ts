import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function debitCreditValidatorFn(debitControlName = 'debit', creditControlName = 'credit') : ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const groupValue = group.value;
    const debitControl = groupValue?.[debitControlName];
    const creditControl = groupValue?.[creditControlName];

    const hasDebit = debitControl !== null && debitControl !== undefined && debitControl !== 0; 
    const hasCredit = creditControl !== null && creditControl !== undefined && creditControl !== 0;

    // Both filled → invalid
    if (hasDebit && hasCredit) {
      const error = { invalidCombination: true };
      group.get(debitControlName)?.setErrors(error);
      group.get(creditControlName)?.setErrors(error);
      return error;
    }

    // Both empty → invalid
    if (!hasDebit && !hasCredit) {
      const error = { invalidCombination: true };
      group.get(debitControlName)?.setErrors(error);
      group.get(creditControlName)?.setErrors(error);
      return error;
    }

    if (debitControl === 0 || creditControl === 0) { 
      const error = { invalidAmount: true }; 
      if (debitControl === 0) group.get(debitControlName)?.setErrors(error); 
      if (creditControl === 0) group.get(creditControlName)?.setErrors(error);
      debitControl?.markAsTouched(); creditControl?.markAsTouched();
      return error; 
    }

    // Exactly one filled → valid
    group.get(debitControlName)?.setErrors(null);
    group.get(creditControlName)?.setErrors(null);
    return null;
  }
}