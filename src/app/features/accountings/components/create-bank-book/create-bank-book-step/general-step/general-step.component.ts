import { Component, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { DatepickerFormFieldComponent } from '@ek/shared/components/form-fields/datepicker-form-field/datepicker-form-field.component';
import { SectionTitleComponent } from "@ek/shared/components/section-title/section-title/section-title.component";

@Component({
  selector: 'ek-general-step',
  imports: [SectionTitleComponent, DatepickerFormFieldComponent],
  templateUrl: './general-step.component.html',
  styleUrl: './general-step.component.scss'
})
export class GeneralStepComponent {
  bankBookDateError = signal<string>('');

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}

  onBankBookDateError(error: ValidationErrors | null): void {
    console.log('GeneralStepComponent - onBankBookDateError', error);

    if (error) {
      this.bankBookDateError.set('Ungültiges Datum');
      this._createBankBookFacade.actions.setIsValidForm(false);
    } else {
      this.bankBookDateError.set('');
      this._createBankBookFacade.actions.setIsValidForm(true);
    }
  }
}
