import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function eitherOrValidator(fieldA: string, fieldB: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fg = control as any;
    const aCtrl = fg?.get?.(fieldA);
    const bCtrl = fg?.get?.(fieldB);

    if (!aCtrl || !bCtrl) return null; // nothing to validate if fields missing

    const filledA = isFilled(aCtrl.value);
    const filledB = isFilled(bCtrl.value);

    if (!filledA && !filledB) return { eitherOrRequired: true };
    if (filledA && filledB) return { eitherOrBothFilled: true };
    return null;
  };
}

/**
 * Validates that exactly one of `fieldA` or `fieldB` is filled.
 * Treats null/undefined/''/whitespace and numeric zero (0 or "0") as empty.
 */
function isFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const s = value.trim();
    if (s === '') return false;
    // treat string "0" or "0.0" as empty
    const n = Number(s);
    if (!Number.isNaN(n) && n === 0) return false;
    return true;
  }
  // For booleans and other types consider non-null as filled
  return true;
}