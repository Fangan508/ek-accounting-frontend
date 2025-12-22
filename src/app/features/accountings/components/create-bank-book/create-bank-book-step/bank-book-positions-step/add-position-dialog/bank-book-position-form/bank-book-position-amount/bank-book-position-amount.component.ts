import { Component, Input } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { eitherOrValidator } from '@ek/shared/validators/either-or.validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextboxFormFieldComponent } from '@ek/shared/components/form-fields/textbox-form-field/textbox-form-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'ek-bank-book-position-amount',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule, TextboxFormFieldComponent],
  templateUrl: './bank-book-position-amount.component.html',
  styleUrl: './bank-book-position-amount.component.scss'
})
export class BankBookPositionAmountComponent {
  @Input() formGroup!: FormGroup;

  creditControl = new FormControl<number | null>(null);
  debitControl = new FormControl<number | null>(null);

  // get creditControl(): FormControl {
  //   return this.formGroup.get('credit') as FormControl;
  // }

  // get debitControl(): FormControl {
  //   return this.formGroup.get('debit') as FormControl;
  // }

  ngOnInit(): void {
    // if (this.formGroup) {
    //   this.formGroup.addValidators(eitherOrValidator('credit', 'debit'));
    // }

    if (!this.formGroup) {
      throw new Error('formGroup input is required');
    }
  }
}
