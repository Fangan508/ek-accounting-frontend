import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NumerictextboxFormFieldComponent } from "@ek/shared/components/form-fields/numerictextbox-form-field/numerictextbox-form-field.component";

@Component({
  selector: 'ek-bank-book-pos-doc-number',
  imports: [NumerictextboxFormFieldComponent],
  templateUrl: './bank-book-pos-doc-number.component.html',
  styleUrl: './bank-book-pos-doc-number.component.scss'
})
export class BankBookPosDocNumberComponent implements ControlValueAccessor  {
  value: number | null = null;

  private onChange: (val: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  // Called by Angular when form writes a value
  writeValue(val: number | null): void {
    this.value = val;
  }

  // Register change callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register touched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Handle value changes from the inner component
  onValueChange(val: number) {
    this.value = val;
    this.onChange(val);
  }
}
