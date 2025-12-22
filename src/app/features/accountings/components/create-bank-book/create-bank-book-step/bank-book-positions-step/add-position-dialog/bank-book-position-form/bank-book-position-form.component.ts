import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { DatepickerFormFieldComponent } from '@ek/shared/components/form-fields/datepicker-form-field/datepicker-form-field.component';
import { BankBookPositionTitleComponent } from "./bank-book-position-title/bank-book-position-title.component";
import { TextboxFormFieldComponent } from '@ek/shared/components/form-fields/textbox-form-field/textbox-form-field.component';
import { BankBookPositionAmountComponent } from "./bank-book-position-amount/bank-book-position-amount.component";
import { BankBookPosDocNumberComponent } from "./bank-book-pos-doc-number/bank-book-pos-doc-number.component";
import { BankBookPosition } from '@ek/features/accountings/models/bank-book-position.model';
import { NumerictextboxFormFieldComponent } from "@ek/shared/components/form-fields/numerictextbox-form-field/numerictextbox-form-field.component";

@Component({
  selector: 'ek-bank-book-position-form',
  imports: [TextboxFormFieldComponent, DatepickerFormFieldComponent, BankBookPositionAmountComponent, BankBookPosDocNumberComponent, ReactiveFormsModule, NumerictextboxFormFieldComponent],
  templateUrl: './bank-book-position-form.component.html',
  styleUrl: './bank-book-position-form.component.scss'
})
export class BankBookPositionFormComponent {
  bankBookPositionDateError = signal<string>('');

  @Output() positionChange = new EventEmitter<BankBookPosition>();

form = new FormGroup({
    documentNumber: new FormControl('', Validators.required),  // For document number
    date: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),  // For title
    amount: new FormGroup({
      credit: new FormControl(0),  // For credit amount
      debit: new FormControl(0)    // For debit amount
    })
  });

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}

  submitForm() {
    
    console.log('Form submitted:', this.form.value);

    if (this.form.valid) {

      const formValue = this.form.value;
      const position: BankBookPosition = {
        date: formValue.date,
        text: formValue.text,
        credit: formValue.amount?.credit || 0,
        debit: formValue.amount?.debit || 0,
        description: formValue.text,
        amount: (formValue.amount?.credit || 0) - (formValue.amount?.debit || 0),
        bookingDate: formValue.date,
        account: '',
        balance: 0,
        counterAccount: '',
        documentNumber: ''
      };

      console.log("Position:", position);
      console.log("Date submitted:", position.date);

      this.positionChange.emit(position);
    } else {
      console.log("Form is invalid");
    }
  }

  onBankBookPositionDateError(error: ValidationErrors | null): void {
    if (error) {
      this.bankBookPositionDateError.set('Ungültiges Datum');
      this._createBankBookFacade.actions.setIsValidForm(false);
    } else {
      this.bankBookPositionDateError.set('');
      this._createBankBookFacade.actions.setIsValidForm(true);
    }
  }
}
