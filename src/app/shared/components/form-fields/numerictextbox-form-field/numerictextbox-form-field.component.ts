// import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { AbstractInputControlDirective } from '@ek/shared/directives/abstract-input-control.directive';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgClass, NgTemplateOutlet } from "@angular/common";
import { FormFieldErrorPipe } from '@ek/shared/pipes/form-field-error.pipe';
import { FormControl, NgControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { AbstractInputControlDirective } from '@ek/shared/directives/abstract-input-control.directive';
import { InputErrorTranslation } from '../models/input-error-translation.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MAX_NUMERIC_VALUE, MIN_NUMERIC_VALUE } from '../utils/form-fields.utils';

@Component({
  selector: 'ek-numerictextbox-form-field',
  standalone: true,
  // imports: [MatFormFieldModule, MatInputModule],
  imports: [
    NgClass,
    MatFormFieldModule, 
    MatInputModule, 
    NgTemplateOutlet, 
    FormFieldErrorPipe, 
    ReactiveFormsModule],
  templateUrl: './numerictextbox-form-field.component.html',
  styleUrl: './numerictextbox-form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumerictextboxFormFieldComponent extends AbstractInputControlDirective<FormControl> implements OnInit {
  @Input() customClass?: string;
  @Input() min = MIN_NUMERIC_VALUE;
  @Input() max = MAX_NUMERIC_VALUE;
  @Input() customControlError: InputErrorTranslation | null = null;

  @Output() inputBlur = new EventEmitter<void>();
  @Output() hasError = new EventEmitter<ValidationErrors | null>();

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
  }
}
