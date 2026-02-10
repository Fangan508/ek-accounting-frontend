import { Component, EventEmitter, Output, signal, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { DatepickerFormFieldComponent } from '@ek/shared/components/form-fields/datepicker-form-field/datepicker-form-field.component';
import { TextboxFormFieldComponent } from '@ek/shared/components/form-fields/textbox-form-field/textbox-form-field.component';
import { BankBookPosition } from '@ek/features/accountings/models/bank-book-position.model';
import { NumerictextboxFormFieldComponent } from "@ek/shared/components/form-fields/numerictextbox-form-field/numerictextbox-form-field.component";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debitCreditValidatorFn } from '@ek/shared/utils/form-validators.utils';

@UntilDestroy()
@Component({
  selector: 'ek-bank-book-position-form',
  imports: [TextboxFormFieldComponent, DatepickerFormFieldComponent, ReactiveFormsModule, NumerictextboxFormFieldComponent],
  templateUrl: './bank-book-position-form.component.html',
  styleUrl: './bank-book-position-form.component.scss'
})
export class BankBookPositionFormComponent implements OnInit {
  bankBookPositionDateError = signal<string>('');

  @ViewChild('documentNumberInput', { static: false }) documentNumberInput!: NumerictextboxFormFieldComponent;

  @Output() positionChange = new EventEmitter<BankBookPosition>();
  @Output() validityChange = new EventEmitter<boolean>();

  bookingAmounts = new FormGroup(
  {
    debit: new FormControl<number | null>(null),
    credit: new FormControl<number | null>(null)
  }, 
  { validators: debitCreditValidatorFn() }
  );

  bankBookPositionForm = new FormGroup({
    documentNumber: new FormControl<number>(0, [Validators.required, Validators.min(1)]),  // For document number
    date: new FormControl<Date>(new Date(), [Validators.required, this.dateValidator]),  // For date
    text: new FormControl('', [Validators.required, Validators.minLength(4)]),  // For title
    bookingAmounts: this.bookingAmounts
  });

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}

  submitForm() {
    
    console.log('Form submitted:', this.bankBookPositionForm.value);

    if (this.bankBookPositionForm.valid) {

      const formValue = this.bankBookPositionForm.value;
      const position: BankBookPosition = {
        date: formValue.date,
        text: formValue.text,
        credit: formValue.bookingAmounts?.credit || 0,
        debit: formValue.bookingAmounts?.debit || 0,
        description: formValue.text,
        amount: 0,
        bookingDate: formValue.date,
        account: '',
        balance: 0,
        counterAccount: '',
        documentNumber: formValue.documentNumber || 0
      };

      console.log("Position:", position);
      console.log("Date submitted:", position.date);

      this.positionChange.emit(position);
    } else {
      console.log("Form is invalid");
    }
  }

  ngOnInit(): void {
    this.updateConfig();

    this.bankBookPositionForm.statusChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.validityChange.emit(this.bankBookPositionForm.valid);
    });

    // Emit initial validity
    this.validityChange.emit(this.bankBookPositionForm.valid);

    // this.bookingAmounts.valueChanges.subscribe(value => {
    //   console.log('Debit/Credit form value changed:', value);
    // }); 
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

  /**
   * Function to update the bank book position config in the state whenever the form values change.
   */
  private updateConfig(): void {
    this.bankBookPositionForm.valueChanges.pipe(untilDestroyed(this)).subscribe(formValues => {
      const { documentNumber, date, text, bookingAmounts } = formValues;

      this._createBankBookFacade.actions.setBankBookPositionConfig({
        documentNumber: documentNumber || 0,
        bookingdate: date,
        description: text || '',
        credit: bookingAmounts?.credit || 0,
        debit: bookingAmounts?.debit || 0
      });
    });
  }

  private dateValidator(control: AbstractControl<Date>): ValidationErrors | null {
    const value = control.value;

    if (!value) return null;

    const date = new Date(value);
    const now = new Date();
    const minDate = new Date('1900-01-01');

    if (date > now || date < minDate) {
      return { invalidDate: true };
    }

    return null;
  }

  focusFirstField(): void { 
    this.documentNumberInput?.focus(); 
  }
}
