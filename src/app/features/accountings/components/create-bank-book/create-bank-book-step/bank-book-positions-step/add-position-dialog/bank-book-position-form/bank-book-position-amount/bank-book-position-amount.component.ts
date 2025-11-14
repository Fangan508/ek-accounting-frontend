import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { eitherOrValidator } from '@ek/shared/validators/either-or.validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextboxFormFieldComponent } from '@ek/shared/components/form-fields/textbox-form-field/textbox-form-field.component';

@Component({
  selector: 'ek-bank-book-position-amount',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, TextboxFormFieldComponent],
  templateUrl: './bank-book-position-amount.component.html',
  styleUrl: './bank-book-position-amount.component.scss'
})
export class BankBookPositionAmountComponent {
  readonly formGroup = new FormGroup({ 
    credit: new FormControl<string>('0.00', []),
    debit: new FormControl<string>('0.00', []),
  });

  readonly formControl = new FormControl<string>('', []);

  ngOnInit(): void {
    const debit = '0.00';
    const credit = '0.00';  

    this.formControl.patchValue(debit, { emitEvent: false } );
    this.formControl.patchValue(credit, { emitEvent: false } );
  }
}
