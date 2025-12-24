import { Component, EventEmitter, Output, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { DatepickerFormFieldComponent } from '@ek/shared/components/form-fields/datepicker-form-field/datepicker-form-field.component';
import { BankBookPositionTitleComponent } from "./bank-book-position-title/bank-book-position-title.component";
import { TextboxFormFieldComponent } from '@ek/shared/components/form-fields/textbox-form-field/textbox-form-field.component';
import { BankBookPositionAmountComponent } from "./bank-book-position-amount/bank-book-position-amount.component";
import { BankBookPosDocNumberComponent } from "./bank-book-pos-doc-number/bank-book-pos-doc-number.component";
import { BankBookPosition } from '@ek/features/accountings/models/bank-book-position.model';
import { NumerictextboxFormFieldComponent } from "@ek/shared/components/form-fields/numerictextbox-form-field/numerictextbox-form-field.component";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ek-bank-book-position-form',
  imports: [TextboxFormFieldComponent, DatepickerFormFieldComponent, BankBookPositionAmountComponent, BankBookPosDocNumberComponent, ReactiveFormsModule, NumerictextboxFormFieldComponent],
  templateUrl: './bank-book-position-form.component.html',
  styleUrl: './bank-book-position-form.component.scss'
})
export class BankBookPositionFormComponent implements OnInit {
  bankBookPositionDateError = signal<string>('');

  @Output() positionChange = new EventEmitter<BankBookPosition>();

  bankBookPositionForm = new FormGroup({
    documentNumber: new FormControl<number>(0, Validators.required),  // For document number
    date: new FormControl<Date>(new Date(), Validators.required),
    text: new FormControl('', Validators.required),  // For title
    amount: new FormGroup({
      credit: new FormControl(0),  // For credit amount
      debit: new FormControl(0)    // For debit amount
    })
  });

  constructor(private readonly _createBankBookFacade: CreateBankBookFacade) {}

  submitForm() {
    
    console.log('Form submitted:', this.bankBookPositionForm.value);

    if (this.bankBookPositionForm.valid) {

      const formValue = this.bankBookPositionForm.value;
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
      const { documentNumber, date, text, amount } = formValues;

      this._createBankBookFacade.actions.setBankBookPositionConfig({
        documentNumber: documentNumber || 0,
        bookingdate: date,
        description: text || '',
        credit: amount?.credit || 0,
        debit: amount?.debit || 0
      });
    });
  }
}
