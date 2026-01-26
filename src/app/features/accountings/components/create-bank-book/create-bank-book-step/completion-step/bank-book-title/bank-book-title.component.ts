import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateBankBookFacade } from '@ek/features/accountings/state/create-bank-book/create-bank-book.facade';
import { TextboxFormFieldComponent } from '@ek/shared/components/form-fields/textbox-form-field/textbox-form-field.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ek-bank-book-title',
  imports: [ReactiveFormsModule, TextboxFormFieldComponent],
  templateUrl: './bank-book-title.component.html',
  styleUrl: './bank-book-title.component.scss'
})
export class BankBookTitleComponent implements OnInit {
  readonly bankBookTitle = this._createBankBookFacade.signalSelectors.bankBookTitle;
  readonly formControl = new FormControl<string>('', [Validators.required, Validators.maxLength(120)]);

  constructor(
    private readonly _createBankBookFacade: CreateBankBookFacade
  ) {}

  ngOnInit(): void {
    const title = 'PiPaPo';
    this.formControl.patchValue(title, { emitEvent: false });

    this.formControl.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      this._createBankBookFacade.actions.setBankBookTitle(value ?? '');
    });
  }
}
