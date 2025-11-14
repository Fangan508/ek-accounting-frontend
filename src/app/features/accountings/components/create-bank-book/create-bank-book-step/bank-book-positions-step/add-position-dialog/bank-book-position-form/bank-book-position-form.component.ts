import { Component, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { DatepickerFormFieldComponent } from '@ek/shared/components/form-fields/datepicker-form-field/datepicker-form-field.component';
import { BankBookPositionTitleComponent } from "./bank-book-position-title/bank-book-position-title.component";

import { BankBookPositionAmountComponent } from "./bank-book-position-amount/bank-book-position-amount.component";

@Component({
  selector: 'ek-bank-book-position-form',
  imports: [DatepickerFormFieldComponent, BankBookPositionTitleComponent, BankBookPositionAmountComponent],
  templateUrl: './bank-book-position-form.component.html',
  styleUrl: './bank-book-position-form.component.scss'
})
export class BankBookPositionFormComponent {
  bankBookPositionDateError = signal<string>('');

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}

  onBankBookPositionDateError(error: ValidationErrors | null): void {
    console.log('GeneralStepComponent - onBankBookDateError', error);

    if (error) {
      this.bankBookPositionDateError.set('Ungültiges Datum');
      this._createBankBookFacade.actions.setIsValidForm(false);
    } else {
      this.bankBookPositionDateError.set('');
      this._createBankBookFacade.actions.setIsValidForm(true);
    }
  }
}
