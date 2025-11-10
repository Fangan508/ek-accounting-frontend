import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgTemplateOutlet } from "@angular/common";
import { FormFieldErrorPipe } from '@ek/shared/pipes/form-field-error.pipe';
import { FormControl, NgControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { AbstractInputControlDirective } from '@ek/shared/directives/abstract-input-control.directive';
import { InputErrorTranslation } from '../models/input-error-translation.model';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'ek-textbox-form-field',
  imports: [
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatInputModule, 
    NgTemplateOutlet, 
    FormFieldErrorPipe, 
    ReactiveFormsModule],
  templateUrl: './textbox-form-field.component.html',
  styleUrl: './textbox-form-field.component.scss'
})
export class TextboxFormFieldComponent extends AbstractInputControlDirective<FormControl> implements OnInit {
  @Input() label = '';
  @Input() customControlError: InputErrorTranslation | null = null;

  @Output() hasError = new EventEmitter<ValidationErrors | null>();

  constructor(@Optional() @Self() ngControl: NgControl, changeDetectorRef: ChangeDetectorRef) {
    super(ngControl, changeDetectorRef);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.hasError.emit(this.control?.errors);
    return;

    if (!this.control) return;
    this.control.statusChanges.pipe(untilDestroyed(this)).subscribe(status => {
      if (status === 'VALID') this.hasError.emit(null);
      else if (!this.control?.hasError('required')) this.hasError.emit(this.control?.errors);
    });

    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(value => this.control.setValue(value, { emitEvent: false}));
  }
}
