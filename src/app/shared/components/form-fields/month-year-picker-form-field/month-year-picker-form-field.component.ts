import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputErrorTranslation } from '../models/input-error-translation.model';
import { DateTime } from 'luxon';
import { FormFieldErrorPipe } from "@ek/shared/pipes/form-field-error.pipe";
import { untilDestroyed } from '@ngneat/until-destroy';
import { AbstractInputControlDirective } from '@ek/shared/directives/abstract-input-control.directive';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { NgTemplateOutlet } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/yyyy',
  },
  display: {
    dateInput: 'MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'DD',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'ek-month-year-picker-form-field',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FormFieldErrorPipe,
    NgTemplateOutlet, 
    FormsModule,
    ReactiveFormsModule],
  providers: [provideLuxonDateAdapter(MY_FORMATS)],
  templateUrl: './month-year-picker-form-field.component.html',
  styleUrl: './month-year-picker-form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthYearPickerFormFieldComponent extends AbstractInputControlDirective<FormControl> implements OnInit {
  readonly date = new FormControl<DateTime>(DateTime.now());

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
  
  setMonthAndYear(normalizedMonthAndYear: DateTime, datepicker: MatDatepicker<DateTime>) {
    const ctrlValue = DateTime.fromObject({
      month: normalizedMonthAndYear.month,
      year: normalizedMonthAndYear.year,
    });
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}