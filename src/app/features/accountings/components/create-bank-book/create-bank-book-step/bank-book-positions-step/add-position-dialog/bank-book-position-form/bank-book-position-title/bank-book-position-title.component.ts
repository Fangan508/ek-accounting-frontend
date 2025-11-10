import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TextboxFormFieldComponent } from '@ek/shared/components/form-fields/textbox-form-field/textbox-form-field.component';

@Component({
  selector: 'ek-bank-book-position-title',
  imports: [TextboxFormFieldComponent],
  templateUrl: './bank-book-position-title.component.html',
  styleUrl: './bank-book-position-title.component.scss'
})
export class BankBookPositionTitleComponent {
  readonly formControl = new FormControl<string>('', [Validators.required, Validators.min(1), Validators.maxLength(120)]);
}
