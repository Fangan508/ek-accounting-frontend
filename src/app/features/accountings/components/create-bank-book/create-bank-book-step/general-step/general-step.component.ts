import { Component, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { DatepickerFormFieldComponent } from '@ek/shared/components/form-fields/datepicker-form-field/datepicker-form-field.component';
import { SectionTitleComponent } from "@ek/shared/components/section-title/section-title/section-title.component";
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ek-general-step',
  imports: [ReactiveFormsModule, SectionTitleComponent, DatepickerFormFieldComponent],
  templateUrl: './general-step.component.html',
  styleUrl: './general-step.component.scss'
})
export class GeneralStepComponent implements OnInit {
  readonly bankBookMonth = this._createBankBookFacade.signalSelectors.bankBookMonth;
  readonly formControl = new FormControl<Date | null | undefined>(undefined);

  bankBookDateError = signal<string>('');

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}

  ngOnInit(): void {
    const month = this.bankBookMonth();
    this.formControl.patchValue(month ? new Date(month) : undefined, { emitEvent: false });

    this.formControl.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      this._createBankBookFacade.actions.setBankBookMonth(value ?? new Date());
    });
  }

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
