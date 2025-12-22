import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextboxFormFieldComponent } from '@ek/shared/components/form-fields/textbox-form-field/textbox-form-field.component';

@Component({
  selector: 'ek-bank-book-position-title',
  imports: [ ReactiveFormsModule, TextboxFormFieldComponent],
  templateUrl: './bank-book-position-title.component.html',
  styleUrl: './bank-book-position-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankBookPositionTitleComponent implements OnInit {
  formControl = new FormControl<string>('', [Validators.required, Validators.min(1), Validators.maxLength(120)]);


  ngOnInit(): void {
    const bankBookPositionTitle = 'Bank Book Position Title';
    this.formControl.patchValue(bankBookPositionTitle, { emitEvent: false } );
  }
}
