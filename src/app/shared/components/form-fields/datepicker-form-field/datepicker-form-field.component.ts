import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgTemplateOutlet } from "@angular/common";
import { AbstractInputControlDirective } from '@ek/shared/directives/abstract-input-control.directive';
import { FormControl, NgControl, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { FormFieldErrorPipe } from "@ek/shared/pipes/form-field-error.pipe";
import { InputErrorTranslation } from '../models/input-error-translation.model';

@Component({
  selector: 'ek-datepicker-form-field',
  imports: [MatFormFieldModule, MatDatepickerModule, MatInputModule, NgTemplateOutlet, FormFieldErrorPipe, ReactiveFormsModule],
  templateUrl: './datepicker-form-field.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './datepicker-form-field.component.scss'
})
export class DatepickerFormFieldComponent extends AbstractInputControlDirective<FormControl> implements OnInit {
  @Input() label = '';
  @Input() customControlError: InputErrorTranslation | null = null;

  @Output() hasError = new EventEmitter<ValidationErrors | null>();

  get requiredLabel(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  constructor(@Optional() @Self() ngControl: NgControl, changeDetectorRef: ChangeDetectorRef) {
    super(ngControl, changeDetectorRef);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if (!this.control) return;
    this.control.statusChanges.pipe(untilDestroyed(this)).subscribe(status => {
      if (status === 'VALID') this.hasError.emit(null);
      else if (!this.control?.hasError('required')) this.hasError.emit(this.control?.errors);
    });

    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(value => this.control.setValue(value, { emitEvent: false}));
  }
}
